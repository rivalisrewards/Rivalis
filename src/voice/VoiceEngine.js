class VoiceEngine {

  constructor() {

    this.recognition = null
    this.commands = []
    this.active = false
    this.voice = null

  }

  init(commands) {

    this.commands = commands

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) return

    this.recognition = new SpeechRecognition()

    this.recognition.continuous = true
    this.recognition.interimResults = false
    this.recognition.lang = "en-US"

    this.recognition.onresult = (event) => {

      const transcript =
        event.results[event.results.length - 1][0].transcript
          .trim()
          .toLowerCase()

      this.handleCommand(transcript)

    }

    this.recognition.onend = () => {
      if (this.active) this.recognition.start()
    }

  }

  handleCommand(text) {

    for (const cmd of this.commands) {

      if (text.includes(cmd.phrase)) {
        cmd.action(text)
        return
      }

    }

  }

  start() {

    if (!this.recognition) return

    this.active = true
    this.recognition.start()

  }

  stop() {

    if (!this.recognition) return

    this.active = false
    this.recognition.stop()

  }

  setVoice(name) {

    const voices = speechSynthesis.getVoices()

    this.voice = voices.find(v => v.name === name)

  }

  speak(text, rate = 1, pitch = 1) {

    const utter = new SpeechSynthesisUtterance(text)

    utter.rate = rate
    utter.pitch = pitch

    if (this.voice) {
      utter.voice = this.voice
    }

    speechSynthesis.cancel()
    speechSynthesis.speak(utter)

  }

  getVoices() {
    return speechSynthesis.getVoices()
  }

}

export default new VoiceEngine()
