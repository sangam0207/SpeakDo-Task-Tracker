import ErrorResponse from "../lib/error.res.js";
import successRes from "../lib/success.res.js";
import { parseTranscriptWithOpenAI } from "../service/openai.service.js";

export const parseTranscript = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return next(ErrorResponse.badRequest("Text input is required"));
    }

    const parsedData = await parseTranscriptWithOpenAI(text);
   console.log("Parsed Data:", parsedData);
    if (parsedData) {
      successRes.ok(res, 
        "Transcript parsed successfully",
        parsedData,
      );
    }
  } catch (error) {
    console.error("AI Parsing Error:", error);
    return next(ErrorResponse.internalServer("Failed to parse transcript"));
  }
};
