import {calculateMetrics} from "./swingMetrics"
import {detectSwingPlane} from "./swingPlane"
import {detectFaults} from "./swingFaults"
import {detectPhase} from "./phaseDetector"
import {detectTempo} from "./tempoAnalyzer"

export function analyzeGolfSwing(frames){

  const phases=[]
  const wrist=[]
  const metrics=[]

  for(const pose of frames){

    const m=calculateMetrics(pose)

    phases.push(detectPhase(pose))

    wrist.push(pose[15])

    metrics.push(m)

  }

  const plane = detectSwingPlane(wrist)

  const tempo = detectTempo(phases)

  const faults = detectFaults(
    metrics[metrics.length-1],
    plane
  )

  return{
    phases,
    swingPlane:plane,
    tempo,
    faults,
    metrics:metrics.at(-1)
  }

}
