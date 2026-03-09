export function parseVoiceCommand(command, navigate) {

  if (command.includes("dashboard")) {
    navigate("/dashboard");
    return "Opening dashboard";
  }

  if (command.includes("solo")) {
    navigate("/solo");
    return "Opening solo mode";
  }

  if (command.includes("burnout")) {
    navigate("/burnouts");
    return "Opening burnouts";
  }

  if (command.includes("live")) {
    navigate("/live");
    return "Entering live competition";
  }

  if (command.includes("leaderboard")) {
    navigate("/leaderboard");
    return "Opening leaderboard";
  }

  if (command.includes("profile")) {
    navigate("/profile");
    return "Opening profile";
  }

  if (command.includes("stop voice")) {
    return "stop";
  }

  return null;
}
