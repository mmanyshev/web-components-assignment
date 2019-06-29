
declare module "*.css" {
  var _: string;
  export default _;
}

declare module "*.html" {
  var _: string;
  export default _;
}

declare namespace Intl {
  const RelativeTimeFormat: any;
}

declare class webkitSpeechRecognition extends SpeechRecognition {

  continuous: boolean;
  interimResults: boolean;

  abort: () => void;
  start: () => void;
  stop: () => void;

  onstart: () => void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  // onend: (event: any) => void;

}
