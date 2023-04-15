import { useState } from 'react'
import './App.css'
import List from './List/List'
import Details from './Details/Details'
import Form from './Form/Form'


function randomid(){
  const idsample= "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let id = ""
  for (let i=0; i<6;i++){
    id += idsample[Math.floor(Math.random() * 36)]
  }
  return id
}

function App() {
  const [mode, setMode] = useState(true)
  const [fullinfo, setFullinfo] = useState([])

  const [editmode, setEditmode] = useState(false)

  const [getId, setGetId] = useState(null)

  const [showlist, setShowList] = useState(true)

  const [canceled, setCanceled] = useState(true)

  const [id, setId] = useState(randomid())
  const [idarr, setIdarr] = useState([id])

  return (
    <div className="App" style={{backgroundColor:`var(${mode ? "--dark":"--light"}-theme-background)`}}>
      {/* <button className="toggle" onClick={() => setMode(!mode)} >{!mode ? "dark":"light"}</button> */}
      {console.log(idarr)}
      {showlist && <button onClick={() => {setCanceled(!canceled);setEditmode(false)}}>add new</button>}
      <div className="body">
        {showlist ? 
        fullinfo.map((e, i) => <List key={i} id={e.id} number={e.id} date={e.paymentDate} name={e.clientName} amount={e.totalamt} status={e.status} mode={mode} showlist={showlist} setShowList={setShowList} index={i} setGetId={setGetId}/>):
        <Details showlist={showlist} setShowList={setShowList} infoid={fullinfo[getId]} fullinfo={fullinfo} setFullinfo={setFullinfo} editmode={editmode} setEditmode={setEditmode} canceled={canceled} setCanceled={setCanceled} getId={getId} />}
      </div>
      <Form canceled={canceled} setCanceled={setCanceled} fullinfo={fullinfo} setFullinfo={setFullinfo} editmode={editmode} setEditmode={setEditmode} infoid={fullinfo[getId]} setShowList={setShowList} idss={id} setId={setId} idarr={idarr} setIdarr={setIdarr} randomid={randomid} />
    </div>
  )
}

export default App