import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskForm from "./TaskForm";

import {
  initializeSpeechRecognition,
  startRecording,
  stopRecording,
} from "@/utils/audioTracker";
import type { Task, TaskFormData } from "@/types/task.types";
import { apiParseTranscript } from "@/services/openai.service";

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<Task, "id" | "createdAt">) => Promise<void>;
}

const initialFormData: TaskFormData = {
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
};

export default function VoiceInputModal({
  isOpen,
  onClose,
  onCreateTask,
}: VoiceInputModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [isParsing, setIsParsing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const recognition = initializeSpeechRecognition({
      onStart: () => {
        setIsRecording(true);
        setError("");
      },
      onResult: (finalTranscript) => {
        setTranscript((prev) => prev + finalTranscript);
      },
      onError: (errorMsg) => {
        setIsRecording(false);
        setError(errorMsg);
      },
      onEnd: () => {
        setIsRecording(false);
      },
    });

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        stopRecording(recognitionRef.current);
      }
    };
  }, []);

  const handleVoiceRecord = async () => {
    if (isRecording) {
      stopRecording(recognitionRef.current);
      setIsRecording(false);

      if (transcript) {
        await parseTranscript();
      }
    } else {
      setTranscript("");
      setError("");
      setFormData(initialFormData);
      try {
        startRecording(recognitionRef.current);
      } catch (error) {
        setError((error as Error).message);
      }
    }
  };

  const parseTranscript = async () => {
    setIsParsing(true);
    setIsProcessing(true);

    try {
      const parsed = await apiParseTranscript({ text: transcript });
      const parsedRes = parsed.data.data;
      setFormData(parsedRes);
    } catch (error) {
      console.error("Error parsing with OpenAI:", error);
      setError(
        "Failed to parse transcript with AI. Please edit the fields manually."
      );

      setFormData({
        title: transcript.substring(0, 100),
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
      });
    } finally {
      setIsParsing(false);
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateTask({
        title: formData.title,
        description: formData.description || undefined,
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate || undefined,
      });
      handleClose();
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isRecording) {
      stopRecording(recognitionRef.current);
    }
    setFormData(initialFormData);
    setTranscript("");
    setIsRecording(false);
    setIsParsing(false);
    setError("");
    setIsSubmitting(false);
    onClose();
  };

  const showMicButton = !isParsing && !formData.title;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {(isProcessing || isParsing) && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-lg">
            <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
            <p className="mt-3 text-sm text-gray-700 font-medium">
              AI is analyzing your voice input...
            </p>
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Voice Input
            <Sparkles className="w-4 h-4 text-purple-500" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {showMicButton && (
            <div className="flex flex-col items-center justify-center py-8">
              <Button
                size="lg"
                onClick={handleVoiceRecord}
                disabled={isProcessing || isParsing || !!error}
                className={`h-24 w-24 rounded-full transition-all ${
                  isRecording
                    ? "bg-red-600 hover:bg-red-700 animate-pulse"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                }`}
              >
                {isProcessing || isParsing ? (
                  <Loader2 className="h-10 w-10 animate-spin" />
                ) : isRecording ? (
                  <MicOff className="h-10 w-10" />
                ) : (
                  <Mic className="h-10 w-10" />
                )}
              </Button>
              <p className="text-sm text-gray-600 mt-4 font-medium">
                {isParsing
                  ? "AI is parsing your task..."
                  : isProcessing
                  ? "Processing..."
                  : isRecording
                  ? "Recording... Click to stop"
                  : "Click to start recording"}
              </p>

              {isRecording && (
                <div className="mt-2 flex items-center gap-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium">Listening...</span>
                </div>
              )}

              {isParsing && (
                <div className="mt-2 flex items-center gap-2 text-purple-600">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-xs font-medium">
                    AI is extracting task details...
                  </span>
                </div>
              )}
            </div>
          )}

          {transcript && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block text-gray-700">
                  Transcript
                </label>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-4 rounded-lg text-sm text-gray-800 max-h-32 overflow-y-auto">
                  <p className="italic">"{transcript.trim()}"</p>
                </div>
              </div>

              {!isParsing && formData.title && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-gray-900">
                      AI Parsed Task Details
                    </h3>
                    <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Powered</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Review and edit the fields below before creating the task
                  </p>
                  <TaskForm
                    formData={formData}
                    onChange={setFormData}
                    showStatus={false}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          {transcript && !isParsing && (
            <Button
              onClick={handleSubmit}
              disabled={!formData.title.trim() || isProcessing || isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Task"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}