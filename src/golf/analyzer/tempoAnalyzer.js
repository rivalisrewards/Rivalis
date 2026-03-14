export function detectTempo(phases){

  const back=phases.filter(p=>p==="backswing").length
  const down=phases.filter(p=>p==="downswing").length

  if(!down) return "unknown"

  return (back/down).toFixed(2)

}
