export function angle(a,b,c){

  const ab = {x:a.x-b.x,y:a.y-b.y}
  const cb = {x:c.x-b.x,y:c.y-b.y}

  const dot = ab.x*cb.x + ab.y*cb.y

  const magAB = Math.sqrt(ab.x**2+ab.y**2)
  const magCB = Math.sqrt(cb.x**2+cb.y**2)

  const cos = dot/(magAB*magCB)

  return Math.acos(cos)*(180/Math.PI)

}

export function rotation(a,b){

  return Math.atan2(
    b.y-a.y,
    b.x-a.x
  )*(180/Math.PI)

}
