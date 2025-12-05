import OpenAI from "openai";
import { ENV } from "../configs/constant.js";

const client = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
});

export const parseTranscriptWithOpenAI = async (text) => {
  const currentDate = new Date().toISOString().split("T")[0];

  const prompt = `
You are an expert task-parsing system. Your job is to extract structured task data from natural language instructions.

Your output MUST follow this exact JSON format:

{
  "title": "string",
  "description": "string",
  "priority": "low" | "medium" | "high",
  "status": "todo",
  "dueDate": "YYYY-MM-DD or empty string"
}

-----------------------------
TASK PARSING RULES
-----------------------------

1. TITLE
   - Extract the core actionable task.
   - Remove filler phrases like:
     "remind me to", "please create a task for", "I need to", "can you add a task"
   - Must be short, clear, and actionable.

2. DESCRIPTION
   - Include extra context or details if given.
   - If no details → empty string "".

3. PRIORITY
   - High priority: urgent, asap, right away, critical, important
   - Low priority: low priority, optional, whenever possible, not urgent
   - Default to "medium" if unclear.

4. DUE DATE PARSING
   Convert natural language dates into YYYY-MM-DD:
   - "today" = ${currentDate}
   - "tomorrow" = +1 day
   - "day after tomorrow" = +2 days
   - "next week" = +7 days
   - "in X days" = +X days
   - "next Monday/Tuesday/etc" = next occurrence
   - "January 5", "5th Jan", "15/01" → parse to YYYY-MM-DD
   If no date → empty string "".

5. STATUS
   - Always return: "todo".

-----------------------------
STRICT OUTPUT RULES
-----------------------------

- Return ONLY valid JSON.
- No markdown, no code block, no explanation.
- Must be directly parsable.

-----------------------------
USER INPUT
-----------------------------

${text}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 500,
    messages: [
      { role: "system", content: prompt },
    ],
  });

  let aiContent = response.choices[0].message.content.trim();

  // Clean JSON 
  aiContent = aiContent
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(aiContent);
  } catch (err) {
    throw new Error("AI returned invalid JSON");
  }

  return {
    title: parsed.title || text.substring(0, 80),
    description: parsed.description || "",
    priority: ["low", "medium", "high"].includes(parsed.priority)
      ? parsed.priority
      : "medium",
    status: "todo",
    dueDate: parsed.dueDate || "",
  };
};
