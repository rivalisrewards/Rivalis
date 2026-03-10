class VoiceMessaging {

  sendGlobal(text) {

    const message = text.replace("send message", "").trim()

    if (!message) return

    window.dispatchEvent(
      new CustomEvent("voiceGlobalMessage", { detail: message })
    )

  }

  sendDM(text) {

    const message = text.replace("reply", "").trim()

    if (!message) return

    window.dispatchEvent(
      new CustomEvent("voiceDMMessage", { detail: message })
    )

  }

}

export default new VoiceMessaging()
