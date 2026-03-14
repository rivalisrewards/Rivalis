export function detectPhase(pose){

  const lw=pose[15]
  const ls=pose[11]
  const rh=pose[24]

  if(Math.abs(lw.y-ls.y)<0.03)
    return "address"

  if(lw.x<ls.x)
    return "takeaway"

  if(lw.y<ls.y)
    return "backswing"

  if(lw.y<rh.y)
    return "top"

  if(lw.x>rh.x)
    return "downswing"

  if(Math.abs(lw.y-rh.y)<0.03)
    return "impact"

  return "follow"

}
