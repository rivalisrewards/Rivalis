import { useNavigate } from "react-router-dom";
import useVoiceCommands from "../hooks/useVoiceCommands";
import { useVoice } from "../context/VoiceContext";

export default function VoiceController() {

  const navigate = useNavigate();
  const { voiceEnabled, stopVoice } = useVoice();

  useVoiceCommands(voiceEnabled, navigate, stopVoice);

  return null;
}
