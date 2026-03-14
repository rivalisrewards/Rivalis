const shoulderRotation = rotation(ls,rs)
  const hipRotation = rotation(lh,rh)

  const xFactor = shoulderRotation-hipRotation

  const leftArmAngle = angle(ls,le,lw)
  const rightArmAngle = angle(rs,re,rw)

  return{
    shoulderRotation,
    hipRotation,
    xFactor,
    leftArmAngle,
    rightArmAngle
  }

}
