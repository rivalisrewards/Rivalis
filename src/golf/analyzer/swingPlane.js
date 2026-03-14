export function detectSwingPlane(history){

  if(history.length<5) return "unknown"

  const start=history[0]
  const end=history[history.length-1]

  const dx=end.x-start.x
  const dy=end.y-start.y

  const slope=dy/dx

  if(slope>1) return "steep"

  if(slope<0.5) return "flat"

  return "neutral"

}
