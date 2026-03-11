let recognition = null
let commands = []
let wakeWord = "rivalis"

let isRunning = false

function normalize(text){

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g,"")
    .trim()

}

function matchCommand(transcript){

  const cleaned = normalize(transcript)

  for(const cmd of commands){

    for(const phrase of cmd.command){

      if(cleaned.includes(normalize(phrase))){

        cmd.action()

        return true

      }

    }

  }

  return false

}

function processTranscript(transcript){

  const cleaned = normalize(transcript)

  if(!cleaned.includes(wakeWord)) return

  const commandPart = cleaned.replace(wakeWord,"").trim()

  if(!commandPart) return

  matchCommand(commandPart)

}

function createRecognition(){

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if(!SpeechRecognition){

    console.warn("SpeechRecognition not supported")

    return null

  }

  const rec = new SpeechRecognition()

  rec.continuous = true
  rec.interimResults = false
  rec.lang = "en-US"

  rec.onresult = (event)=>{

    const resultIndex = event.resultIndex
    const transcript = event.results[resultIndex][0].transcript

    processTranscript(transcript)

  }

  rec.onerror = (err)=>{

    console.warn("Voice error:",err)

  }

  rec.onend = ()=>{

    if(isRunning){

      try{

        rec.start()

      }catch(e){

        console.warn("Restart failed",e)

      }

    }

  }

  return rec

}

const WakeWordEngine = {

  init(commandList){

    commands = commandList

    if(!recognition){

      recognition = createRecognition()

    }

  },

  start(){

    if(!recognition) return

    if(isRunning) return

    isRunning = true

    try{

      recognition.start()

    }catch(e){

      console.warn("Voice start error",e)

    }

  },

  stop(){

    if(!recognition) return

    isRunning = false

    try{

      recognition.stop()

    }catch(e){

      console.warn("Voice stop error",e)

    }

  },

  setWakeWord(word){

    if(!word) return

    wakeWord = normalize(word)

  }

}

export default WakeWordEngine
