import React from "react"
import {analyzeGolfVideo} from "../hooks/useGolfAnalysis"

export default function UploadAnalyzer({setResult}){

  async function handleUpload(e){

    const file=e.target.files[0]

    const result=await analyzeGolfVideo(file)

    setResult(result)

  }

  return(

    <input
      type="file"
      accept="video/*"
      onChange={handleUpload}
    />

  )

}
