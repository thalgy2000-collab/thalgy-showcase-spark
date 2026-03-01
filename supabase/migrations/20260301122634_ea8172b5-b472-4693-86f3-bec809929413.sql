
-- Profile table for editable personal data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT 'Thalgy Lino',
  title TEXT NOT NULL DEFAULT 'Product Manager',
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/thalgy-lino-438445196/',
  location TEXT DEFAULT 'Uberlândia, MG',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can view profiles (public portfolio)
CREATE POLICY "Profiles are publicly viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Experiences table
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  products TEXT, -- products created/managed
  technologies TEXT[], -- technologies used
  pm_skills TEXT[], -- PM skills applied
  results JSONB DEFAULT '[]'::jsonb, -- [{metric, label}]
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experiences are publicly viewable" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Users can insert experiences" ON public.experiences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own experiences" ON public.experiences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own experiences" ON public.experiences FOR DELETE USING (auth.uid() = user_id);

-- Experience images
CREATE TABLE public.experience_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.experience_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experience images are publicly viewable" ON public.experience_images FOR SELECT USING (true);
CREATE POLICY "Users can insert experience images" ON public.experience_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.experiences WHERE id = experience_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete experience images" ON public.experience_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.experiences WHERE id = experience_id AND user_id = auth.uid())
);

-- Certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  link TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Certifications are publicly viewable" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Users can manage certifications" ON public.certifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update certifications" ON public.certifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete certifications" ON public.certifications FOR DELETE USING (auth.uid() = user_id);

-- Education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  status TEXT DEFAULT 'completed', -- completed, in_progress, incomplete
  progress INTEGER DEFAULT 100,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Education is publicly viewable" ON public.education FOR SELECT USING (true);
CREATE POLICY "Users can manage education" ON public.education FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update education" ON public.education FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete education" ON public.education FOR DELETE USING (auth.uid() = user_id);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('experience-images', 'experience-images', true);

-- Storage policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their avatars" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete their avatars" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Experience images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'experience-images');
CREATE POLICY "Authenticated users can upload experience images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'experience-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete experience images" ON storage.objects FOR DELETE USING (bucket_id = 'experience-images' AND auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
