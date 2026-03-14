export function detectFaults(metrics,plane){

  const faults=[]

  if(metrics.xFactor<20)
    faults.push("Poor shoulder-hip separation")

  if(metrics.rightArmAngle<100)
    faults.push("Right arm collapsing")

  if(metrics.leftArmAngle<150)
    faults.push("Lead arm bending")

  if(plane==="steep")
    faults.push("Over the top swing")

  if(!faults.length)
    faults.push("Swing mechanics look good")

  return faults

}
