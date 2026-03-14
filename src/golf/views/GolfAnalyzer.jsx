export default function GolfAnalyzer(){

  const[result,setResult]=useState(null)

  return(

    <div className="page">

      <h1>Golf Swing Analyzer</h1>

      <UploadAnalyzer setResult={setResult}/>

      <ResultPanel result={result}/>

    </div>

  )

}
