import api from "@/services";

export const apiParseTranscript = async (payload: { text: string }) => {
  return await api.post(
    "/ai/parse-transcript",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
