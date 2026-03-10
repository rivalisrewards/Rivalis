class WakeWordEngine {

  constructor(){

    this.recognition = null
    this.active = false
    this.commandMode = false
    this.onCommand = null
    this.wakeWord = "rival"

  }

  setWakeWord(word){

    if(!word) return

    this.wakeWord = word.toLowerCase()

  }

  init(onCommand){

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if(!SpeechRecognition) return

    this.recognition = new SpeechRecognition()

    this.recognition.continuous = true
    this.recognition.interimResults = false
    this.recognition.lang = "en-US"

    this.onCommand = onCommand

    this.recognition.onresult = (event)=>{

      const text =
        event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase()

      this.process(text)

    }

    this.recognition.onend = ()=>{

      if(this.active)
        this.recognition.start()

    }

  }

  start(){

    if(!this.recognition) return

    this.active = true
    this.recognition.start()

  }

  stop(){

    this.active = false

    if(this.recognition)
      this.recognition.stop()

  }

  speak(text){

    const msg = new SpeechSynthesisUtterance(text)

    speechSynthesis.speak(msg)

  }

  process(text){

    if(!this.commandMode){

      if(text.includes(this.wakeWord)){

        this.commandMode = true

        this.speak("Yes")

        setTimeout(()=>{

          this.commandMode = false

        },6000)

      }

      return

    }

    if(this.onCommand)
      this.onCommand(text)

    this.commandMode = false

  }

}

export default new WakeWordEngine()
