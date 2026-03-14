
  const poses=[]

  let time=0

  for(const frame of frames){

    const result = detectPose(frame,time)

    if(result.landmarks && result.landmarks[0])
      poses.push(result.landmarks[0])

    time+=33

  }

  return poses

}
