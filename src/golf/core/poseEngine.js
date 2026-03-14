import {
  PoseLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision"

let landmarker

export async function initPoseEngine(){

  if(landmarker) return landmarker

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  )

  landmarker = await PoseLandmarker.createFromOptions(
    vision,
    {
      baseOptions:{
        modelAssetPath:
        "https://storage.googleapis.com/mediapipe-assets/pose_landmarker_lite.task"
      },
      runningMode:"VIDEO",
      numPoses:1
    }
  )

  return landmarker

}

export function detectPose(frame,time){

  return landmarker.detectForVideo(frame,time)

}
