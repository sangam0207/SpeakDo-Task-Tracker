import express from "express";
import {parseTranscript} from "../controllers/openai.controller.js";

const router = express.Router();

router.post("/parse-transcript", parseTranscript);

export default router;
