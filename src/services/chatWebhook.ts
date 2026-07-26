export interface ChatWebhookResponse {
  status: "success";
  output: string;
}

export const sendChatMessage = async (
  sessionId: string,
  message: string,
  webhookUrl: string
): Promise<ChatWebhookResponse> => {
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        message,
        timestamp: new Date().toISOString(),
        source: "portfolio"
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for the output array format
    if (Array.isArray(data) && data.length > 0 && data[0].output) {
      return { status: "success", output: data[0].output };
    }

    throw new Error("Invalid response format from webhook");
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};
