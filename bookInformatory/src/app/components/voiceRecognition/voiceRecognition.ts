
import style from "./voiceRecognition.css";
import markup from "./voiceRecognition.html";

import { TimeoutTask } from "app/timerTask";
import { AppComponent } from "app/appComponent";

import {
  RECOGNITION_END,
  RECOGNITION_START,
  RECOGNITION_UPDATE,
} from "./voiceRecognitionEvents";

export class VoiceRecognition extends AppComponent {

  static TAG_NAME = "mm-voice-recognition";

  private readonly toggleButton: HTMLButtonElement | null;
  private readonly recognitionService: SpeechRecognition | null = null;

  private isRecording: boolean = false;
  private readonly recognitionWatchDog: TimeoutTask;

  constructor() {

    super(style, markup);

    if ("webkitSpeechRecognition" in window) {

      this.recognitionService = new webkitSpeechRecognition() || new SpeechRecognition();

      // OpenLibrary doesn't really support
      // other locales in search API, so...
      this.recognitionService.lang = "en_EN";
      this.recognitionService.continuous = true;
      this.recognitionService.interimResults = true;

      this.recognitionService.onresult = this.onRecognitionResult;
      this.recognitionService.onend = this.onRecognitionStop;
      this.recognitionService.onspeechend = this.stopRecording;

    }

    this.toggleButton = this.root.querySelector("button");
    this.recognitionWatchDog = new TimeoutTask(this.stopRecording, 1e3);

    if (!this.recognitionService) {
      this.toggleButton!.setAttribute("hidden", "");
      this.toggleButton!.setAttribute("disabled", "");
    }

  }

  connectedCallback() {
    this.toggleButton!.addEventListener("click", this.onToggleRecording);
  }

  disconnectedCallback() {
    this.toggleButton!.removeEventListener("click", this.onToggleRecording);
  }

  startRecording = () => {

    if (this.isRecording) {
      return;
    }

    this.recognitionService!.start();
    this.toggleButton!.classList.add("active");

    this.dispatchEvent(
      new CustomEvent(RECOGNITION_START, { bubbles: true }),
    );

  }

  stopRecording = () => {

    this.recognitionService!.stop();
    this.toggleButton!.classList.remove("active");

    this.recognitionWatchDog.reset();

  }

  onToggleRecording = () => {

    try {

      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }

      this.isRecording = !this.isRecording;

    } catch (error) {
      console.error("SpeechRecognition: didn't work out");
    }

  }

  onRecognitionResult = (event: SpeechRecognitionEvent) => {

    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      transcript += event.results[i][0].transcript;
    }

    this.dispatchEvent(
      new CustomEvent(
        RECOGNITION_UPDATE,
        { bubbles: true, detail: transcript },
      ),
    );

    this.recognitionWatchDog.run();

  }

  onRecognitionStop = () => {

    const finalEvent = new CustomEvent(RECOGNITION_END, { bubbles: true });
    this.dispatchEvent(finalEvent);

  }

}
