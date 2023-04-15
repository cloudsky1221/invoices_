import "./Details.css"

function Details({mode, showlist, setShowList, infoid, fullinfo, setFullinfo, editmode, setEditmode, canceled, setCanceled, getId}){


  function paid(){
    setFullinfo(prev => {
      infoid.status = "paid"
      return prev
    })
    return alert("marked as paid")
  }

  function editinfo(){
    setEditmode(true)
    setCanceled(!canceled)
  }

  function deleteinfo(){
    setFullinfo(fullinfo.filter((_, i) => i !== getId))
    setShowList(!showlist)
  }
  return (
    <div className="details-wrapper">
        <div className="top" onClick={() => setShowList(!showlist)}>go back</div>
        <div className="tools">
          <div className="ids">{infoid.id}</div>
          <div className="buttons">
              <button style={{backgroundColor:"var(--dark-theme-background)", color:"#fff"}} onClick={editinfo}>edit</button>
              <button style={{backgroundColor:"var(--dark-theme-delete-button)", color:"#fff"}} onClick={deleteinfo}>delete</button>
              <button style={{backgroundColor:"var(--dark-theme-paid-button)", color:"#fff"}} onClick={paid}>mark as paid</button>
          </div>
        </div>
        <div className="details" style={{backgroundColor:"var(--dark-theme-single-list)", color:"#fff"}}>
          <div className="name">{infoid.clientName}</div>
          <div className="mail">{infoid.clientMail}</div>
          <div className="street">{infoid.toStreet}</div>
          <div className="city">{infoid.toCity}</div>
        </div>
    </div>
  )
}

export default Details  