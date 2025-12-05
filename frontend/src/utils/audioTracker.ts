export interface AudioRecognitionCallbacks {
    onStart: () => void;
    onResult: (finalTranscript: string, interimTranscript: string) => void;
    onError: (error: string) => void;
    onEnd: () => void;
  }
  
  export const initializeSpeechRecognition = (
    callbacks: AudioRecognitionCallbacks
  ) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      callbacks.onError(
        "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
      );
      return null;
    }
  
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
  
    recognition.onstart = () => {
      console.log("Voice recognition started");
      callbacks.onStart();
    };
  
    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";
  
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }
  
      callbacks.onResult(finalTranscript, interimTranscript);
      console.log("Current transcript:", finalTranscript || interimTranscript);
    };
  
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
  
      let errorMessage = `Error: ${event.error}`;
      if (event.error === "no-speech") {
        errorMessage = "No speech detected. Please try again.";
      } else if (event.error === "not-allowed") {
        errorMessage =
          "Microphone access denied. Please allow microphone permissions.";
      }
  
      callbacks.onError(errorMessage);
    };
  
    recognition.onend = () => {
      console.log("Voice recognition ended");
      callbacks.onEnd();
    };
  
    return recognition;
  };
  
  export const startRecording = (recognition: any) => {
    try {
      recognition?.start();
    } catch (error) {
      console.error("Failed to start recognition:", error);
      throw new Error("Failed to start voice recognition");
    }
  };
  
  export const stopRecording = (recognition: any) => {
    try {
      recognition?.stop();
    } catch (error) {
      console.error("Failed to stop recognition:", error);
    }
  };