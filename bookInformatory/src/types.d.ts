
declare module "*.css" {
  const _: string;
  export default _;
}

declare module "*.html" {
  const _: string;
  export default _;
}

declare namespace Intl {
  const RelativeTimeFormat: any;
}

declare class webkitSpeechRecognition extends SpeechRecognition {}
