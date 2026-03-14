import React from "react"

export default function ResultPanel({result}){

  if(!result) return null

  return(

    <div>

      <h2>Analysis</h2>

      <p>Tempo: {result.tempo}</p>

      <p>Swing Plane: {result.swingPlane}</p>

      <ul>

        {result.faults.map((f,i)=>
          <li key={i}>{f}</li>
        )}

      </ul>

    </div>

  )

}
