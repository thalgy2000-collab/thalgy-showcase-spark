import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  user_id: string | null;
  full_name: string;
  title: string;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  location: string | null;
}

// Default fallback data
const defaultProfile: Profile = {
  id: "default",
  user_id: null,
  full_name: "Thalgy Lino",
  title: "Product Manager",
  bio: "De Marketing e Growth para Product Management. Unindo visão estratégica de negócio, análise de dados e mentalidade centrada no usuário para construir produtos digitais com impacto real.",
  photo_url: null,
  linkedin_url: "https://www.linkedin.com/in/thalgy-lino-438445196/",
  location: "Uberlândia, MG",
};

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return (data as Profile) || defaultProfile;
    },
    placeholderData: defaultProfile,
  });
}
