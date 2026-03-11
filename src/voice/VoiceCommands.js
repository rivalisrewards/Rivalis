export default function createVoiceCommands(
  navigate,
  setCommandText,
  setCommandStatus,
  helpers = {}
) {
  const {
    speak,
    stop,
    onStartWorkout,
    onPauseWorkout,
    onResumeWorkout,
    onEndWorkout,
    onNextSet,
    onPreviousSet,
    onOpenChat,
    onCloseChat,
    onStartLiveMatch,
    onOpenCoach,
    onMotivate,
    onCheckRepsLeft,
    onReadScreen,
    onMuteTts,
    onUnmuteTts
  } = helpers

  function clearFeedback(delay = 900) {
    window.setTimeout(() => {
      setCommandStatus("")
      setCommandText("")
    }, delay)
  }

  function runCommand(label, action, options = {}) {
    const {
      status = "Executing",
      clearAfter = true,
      clearDelay = 900
    } = options

    setCommandText(label)
    setCommandStatus(status)

    try {
      action?.()
    } catch (error) {
      console.error(`Voice command failed: ${label}`, error)
      setCommandStatus("Failed")
      clearFeedback(1400)
      return
    }

    if (clearAfter) {
      clearFeedback(clearDelay)
    }
  }

  function dispatchAppEvent(name, detail = {}) {
    window.dispatchEvent(new CustomEvent(name, { detail }))
  }

  return [
    // DASHBOARD / HOME
    {
      command: ["dashboard", "open dashboard", "go to dashboard", "home", "go home"],
      action: () => runCommand("Open dashboard", () => navigate("/dashboard"))
    },

    // SOLO
    {
      command: ["solo", "open solo", "start solo", "solo mode", "go to solo"],
      action: () => runCommand("Open solo", () => navigate("/solo"))
    },

    // BURNOUTS
    {
      command: ["burnouts", "open burnouts", "start burnouts", "burnout mode", "go to burnouts"],
      action: () => runCommand("Open burnouts", () => navigate("/burnouts"))
    },

    // LIVE
    {
      command: [
        "live",
        "open live",
        "start live",
        "live mode",
        "live battle",
        "open live battle",
        "live competition",
        "open live competition"
      ],
      action: () => runCommand("Open live", () => navigate("/live"))
    },

    // LEADERBOARD
    {
      command: [
        "leaderboard",
        "open leaderboard",
        "show leaderboard",
        "go to leaderboard",
        "rankings"
      ],
      action: () => runCommand("Open leaderboard", () => navigate("/leaderboard"))
    },

    // PROFILE
    {
      command: ["profile", "open profile", "show profile", "go to profile", "my profile"],
      action: () => runCommand("Open profile", () => navigate("/profile"))
    },

    // SETTINGS
    {
      command: ["settings", "open settings", "go to settings", "preferences"],
      action: () => runCommand("Open settings", () => navigate("/settings"))
    },

    // CHAT
    {
      command: ["open chat", "open global chat", "show chat", "chat"],
      action: () =>
        runCommand("Open chat", () => {
          if (onOpenChat) {
            onOpenChat()
          } else {
            dispatchAppEvent("rivalis:open-chat")
          }
        })
    },
    {
      command: ["close chat", "hide chat"],
      action: () =>
        runCommand("Close chat", () => {
          if (onCloseChat) {
            onCloseChat()
          } else {
            dispatchAppEvent("rivalis:close-chat")
          }
        })
    },

    // AI COACH
    {
      command: ["open coach", "coach", "show coach", "ai coach"],
      action: () =>
        runCommand("Open coach", () => {
          if (onOpenCoach) {
            onOpenCoach()
          } else {
            dispatchAppEvent("rivalis:open-coach")
          }
        })
    },
    {
      command: ["motivate me", "give me motivation", "coach motivate me", "pump me up"],
      action: () =>
        runCommand("Motivate me", () => {
          if (onMotivate) {
            onMotivate()
          } else if (speak) {
            speak("You are not here to be average. Finish strong.")
          } else {
            dispatchAppEvent("rivalis:motivate")
          }
        })
    },

    // WORKOUT CONTROL
    {
      command: ["start workout", "begin workout", "start my workout"],
      action: () =>
        runCommand("Start workout", () => {
          if (onStartWorkout) {
            onStartWorkout()
          } else {
            dispatchAppEvent("rivalis:start-workout")
          }
        })
    },
    {
      command: ["pause workout", "pause"],
      action: () =>
        runCommand("Pause workout", () => {
          if (onPauseWorkout) {
            onPauseWorkout()
          } else {
            dispatchAppEvent("rivalis:pause-workout")
          }
        })
    },
    {
      command: ["resume workout", "resume", "continue workout"],
      action: () =>
        runCommand("Resume workout", () => {
          if (onResumeWorkout) {
            onResumeWorkout()
          } else {
            dispatchAppEvent("rivalis:resume-workout")
          }
        })
    },
    {
      command: ["end workout", "finish workout", "stop workout"],
      action: () =>
        runCommand("End workout", () => {
          if (onEndWorkout) {
            onEndWorkout()
          } else {
            dispatchAppEvent("rivalis:end-workout")
          }
        })
    },
    {
      command: ["next set", "start next set"],
      action: () =>
        runCommand("Next set", () => {
          if (onNextSet) {
            onNextSet()
          } else {
            dispatchAppEvent("rivalis:next-set")
          }
        })
    },
    {
      command: ["previous set", "last set", "go back a set"],
      action: () =>
        runCommand("Previous set", () => {
          if (onPreviousSet) {
            onPreviousSet()
          } else {
            dispatchAppEvent("rivalis:previous-set")
          }
        })
    },

    // LIVE MATCH CONTROL
    {
      command: ["start match", "start live match", "find match", "queue match"],
      action: () =>
        runCommand("Start live match", () => {
          if (onStartLiveMatch) {
            onStartLiveMatch()
          } else {
            dispatchAppEvent("rivalis:start-live-match")
          }
        })
    },

    // REP / STATUS COMMANDS
    {
      command: ["how many reps left", "reps left", "how many left"],
      action: () =>
        runCommand("Check reps left", () => {
          if (onCheckRepsLeft) {
            onCheckRepsLeft()
          } else {
            dispatchAppEvent("rivalis:check-reps-left")
          }
        })
    },
    {
      command: ["read screen", "read this screen", "read page"],
      action: () =>
        runCommand("Read screen", () => {
          if (onReadScreen) {
            onReadScreen()
          } else if (speak) {
            const mainContent = document.querySelector("main") || document.body
            const text = mainContent?.innerText?.trim()?.slice(0, 700)
            if (text) speak(text)
          }
        })
    },

    // TTS CONTROL
    {
      command: ["stop talking", "stop voice", "be quiet", "mute speech"],
      action: () =>
        runCommand("Stop voice", () => {
          if (stop) stop()
          if (onMuteTts) onMuteTts()
          dispatchAppEvent("rivalis:mute-tts")
        })
    },
    {
      command: ["unmute voice", "enable voice", "turn on speech"],
      action: () =>
        runCommand("Enable voice", () => {
          if (onUnmuteTts) onUnmuteTts()
          dispatchAppEvent("rivalis:unmute-tts")
        })
    },

    // COMMUNITY / SOCIAL
    {
      command: ["friends", "open friends", "show friends"],
      action: () => runCommand("Open friends", () => navigate("/friends"))
    },
    {
      command: ["messages", "open messages", "direct messages", "dm"],
      action: () => runCommand("Open messages", () => navigate("/messages"))
    },
    {
      command: ["achievements", "open achievements", "show achievements"],
      action: () => runCommand("Open achievements", () => navigate("/achievements"))
    },

    // ADMIN
    {
      command: ["admin", "open admin", "admin panel"],
      action: () => runCommand("Open admin", () => navigate("/admin"))
    }
  ]
}
