export async function extractFrames(video){

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const frames=[]

  while(!video.ended){

    ctx.drawImage(video,0,0)

    const bitmap = await createImageBitmap(canvas)

    frames.push(bitmap)

    await new Promise(r=>setTimeout(r,33))

  }

  return frames

}
