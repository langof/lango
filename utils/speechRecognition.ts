export const getSpeechRecognitionObject = async () => {
  (window as any).SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true
  })
  return new SpeechRecognition()
}