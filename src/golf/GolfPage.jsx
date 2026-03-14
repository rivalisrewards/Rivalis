import React, { useEffect, useRef } from "react"

export default function GolfPage(){

  const containerRef = useRef(null)

  useEffect(()=>{

    fetch("/src/golf/ui/index.html")
      .then(res => res.text())
      .then(html => {

        if(containerRef.current){
          containerRef.current.innerHTML = html
        }

      })

  },[])
