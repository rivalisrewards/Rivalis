import VoiceMessaging from "./VoiceMessaging"

export default function createVoiceCommands(navigate) {

  return [

    { phrase: "dashboard", action: () => navigate("/dashboard") },
    { phrase: "open chat", action: () => navigate("/chat") },
    { phrase: "open dm", action: () => navigate("/dm") },
    { phrase: "leaderboard", action: () => navigate("/leaderboard") },
    { phrase: "fitness dashboard", action: () => navigate("/fitness") },
    { phrase: "solo workout", action: () => navigate("/solo") },
    { phrase: "burnouts", action: () => navigate("/burnouts") },
    { phrase: "live match", action: () => navigate("/live") },

    {
      phrase: "send message",
      action: (text) => VoiceMessaging.sendGlobal(text)
    },

    {
      phrase: "reply",
      action: (text) => VoiceMessaging.sendDM(text)
    }

  ]

}
