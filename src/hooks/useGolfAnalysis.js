import {initPoseEngine} from "../core/poseEngine"
import {extractFrames} from "../core/frameExtractor"
import {analyzeFrames} from "../core/videoPipeline"
import {analyzeGolfSwing} from "../analyzer/golfAnalyzer"

export async function analyzeGolfVideo(file){

  await initPoseEngine()

  const video=document.createElement("video")

  video.src=URL.createObjectURL(file)

  await video.play()

  const frames=await extractFrames(video)

  const poses=await analyzeFrames(frames)

  return analyzeGolfSwing(poses)

}
