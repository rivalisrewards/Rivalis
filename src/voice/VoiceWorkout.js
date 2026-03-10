import VoiceEngine from "./VoiceEngine"

export function announceRep(rep) {

  VoiceEngine.speak(`Rep ${rep}`)

}

export function announceCard(card, total) {

  if (card % 5 === 0) {

    const remaining = total - card

    VoiceEngine.speak(
      `${card} cards complete. ${remaining} remaining. Keep pushing.`
    )

  }

  if (card === total) {

    VoiceEngine.speak(
      "Deck complete. Incredible work."
    )

  }

}
