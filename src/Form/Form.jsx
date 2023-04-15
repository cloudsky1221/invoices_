import { useEffect, useState } from "react"
import "./Form.css"

import Del from "../assets/delete.png"


const day = 8_64_00_000

const Label = ({classname, label, text, type, value, editmode}) => {
    return (
        <div className={classname}>
            <label htmlFor={label}>{text}</label> <br />
            <input type={type} name={label} id={label} defaultValue={editmode ? value:""} style={{margin:"0.2rem 0 0.8rem 0"}}/>
        </div>
    )
}

const BillFrom = ({value, editmode}) => {
    return (
        <div className="address">
            <Label classname="single" label="from-street" text="Street Address" type="text" value={value?.fromStreet} editmode={editmode}/>
            <div className="multiple">
                <Label classname="city" label="from-city" text="City" type="text" value={value?.fromCity} editmode={editmode} />
                <Label classname="post" label="from-post" text="Post Code" type="text" value={value?.fromPost} editmode={editmode} />
                <Label classname="country" label="from-country" text="Country" type="text" value={value?.fromCountry} editmode={editmode}/>
            </div>
        </div>
    )
}

const BillTo = ({value, editmode}) => {
    return (
        <div className="address">
            <Label classname="single" label="client-name" text="Client's Name" type="text" value={value?.clientName} editmode={editmode}/>
            <Label classname="single" label="client-mail" text="Client's Mail" type="email" value={value?.clientMail} editmode={editmode}/>
            <Label classname="single" label="to-street" text="Street Address" type="text" value={value?.toStreet} editmode={editmode}/>
            <div className="multiple">
                <Label classname="city" label="to-city" text="City" type="text" value={value?.toCity} editmode={editmode}/>
                <Label classname="post" label="to-post" text="Post Code" type="text" value={value?.toPost} editmode={editmode}/>
                <Label classname="country" label="to-country" text="Country" type="text" value={value?.toCountry} editmode={editmode}/>
            </div>
        </div>
    )
}

const Dates = ({value, editmode}) => {
    return (
        <div className="address">
            <div className="multiple">
                <Label classname="invoice" label="invoice-date" text="Invoice Date" type="date" value={value?.invoiceDate} editmode={editmode}/>
                <div className="pay">
                    <label htmlFor="payment-date">Payment Date</label> <br />
                    <select name="payment-date" id="payment-date" style={{margin:"0.2rem 0 0.8rem 0", height:"2rem", width:"8rem"}} defaultValue={editmode ? value?.paymentTerms : 30}>
                        <option value={30}>after 30 days</option>
                        <option value={60}>after 60 days</option>
                        <option value={90}>after 90 days</option>
                        <option value={120}>after 120 days</option>
                    </select>
                </div>
            </div>
            <Label classname="single" label="project" text="Project" type="text" value={value?.project} editmode={editmode}/>
        </div>
    )
}

const Items = ({handleitems, setItemlist, itemlist, deleteitem}) => {
    return (
        <div className="item-list">
            <div className="item-input">
                <Label classname="item" label="itemname" text="Item Name" type="text" />
                <Label classname="qty" label="qty" text="Qty" type="number" />
                <Label classname="price" label="price" text="Price" type="number" />
                <div className="add">
                    <button onClick={handleitems} style={{marginTop:"1.8rem", padding:"0", height:"2rem", width:"4rem"}}>add</button>
                </div>
            </div>
        
            <div className="show-list">
                <ul style={{margin:"2rem 0 1rem 0", fontSize:"1.2rem"}}>
                    <li>
                        <div className="item">Item Name</div>
                        <div className="qty">Qty.</div>
                        <div className="price">Price</div>
                        <div className="total">Total</div>
                        <div className="delete" onClick={() => setItemlist([])}>Clear</div>
                    </li>
                </ul>
                <ul>
                        {itemlist.map((e,i) => 
                        <li key={i}>
                            <div className="item">{e.item}</div>
                            <div className="qty">{e.qty}</div>
                            <div className="price">{e.price}</div>
                            <div className="total">{e.total}</div>
                            <div className="delete" onClick={() => deleteitem(e.id)}><img src={Del} alt="delete" /></div>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

function Form({canceled, setCanceled, setFullinfo, editmode, infoid, setShowList, idss, setId, idarr, setIdarr, randomid}) {

  const [itemlist, setItemlist] = useState([])

  useEffect(() => {
    if (editmode) setItemlist(infoid?.items)
  }, [editmode])

  function fillinfo(data, days, totalamt){
    setFullinfo(prev => [
        {
          id:idss,
          fromCity:data["from-city"],
          fromCountry:data["from-country"],
          fromPost:data["from-post"],
          fromStreet:data["from-street"],
          clientName:data["client-name"],
          clientMail:data["client-mail"],
          toCity:data["to-city"],
          toCountry:data["to-country"],
          toPost:data["to-post"],
          toStreet:data["to-street"],
          invoiceDate:data["invoice-date"],
          paymentTerms:data["payment-date"],
          paymentDate:`${days.getFullYear()}-${days.getMonth()+1}-${days.getDate()}`,
          project:data["project"],
          items:itemlist,
          totalamt:totalamt,
          status:"pending",
        },...prev]
    )
  }

  function handlesubmit(e){
    e.preventDefault()
    const dataObj = new FormData(e.target)
    const data = Object.fromEntries(dataObj)

    let milis = Date.parse(data["invoice-date"]); 
    let days = new Date((milis + (day * data["payment-date"])));

    let totalamt = 0

    for (const value of itemlist){
        totalamt += value.total
    }

    if (editmode){
        setFullinfo(prev => {
              infoid.id = infoid.id
              infoid.fromCity = data["from-city"]
              infoid.fromCountry = data["from-country"]
              infoid.fromPost = data["from-post"]
              infoid.fromStreet = data["from-street"]
              infoid.clientName = data["client-name"]
              infoid.clientMail = data["client-mail"]
              infoid.toCity = data["to-city"]
              infoid.toCountry = data["to-country"]
              infoid.toPost = data["to-post"]
              infoid.toStreet = data["to-street"]
              infoid.invoiceDate = data["invoice-date"]
              infoid.paymentTerms = data["payment-date"]
              infoid.paymentDate = `${days.getFullYear()}-${days.getMonth()+1}-${days.getDate()}`
              infoid.project = data["project"]
              infoid.items = itemlist
              infoid.totalamt = totalamt
              infoid.status = infoid.status
              return prev
            }
        )
        setShowList(true)
    } else if (!editmode) {
        setId(randomid())
        if (idarr.includes(idss)){
            setId(randomid())
        }else {
            setIdarr(prev => [...prev,idss])
        }

        fillinfo(data, days, totalamt)
        setItemlist([])
    }
    e.target.reset()
    setCanceled(!canceled)
    }

  function cancel(e){
    e.preventDefault()
    setCanceled(!canceled)
  }

  function handleitems(e){
    e.preventDefault()
    const itemarr = 
      [];

    Object.values(document.querySelectorAll(".item-input input")).map((e, i) => {
        itemarr.push(e.value)
        e.value = "";
        if (i === 0){
            e.focus()
        }
    })
    setItemlist( prev => [...prev,{
        id:itemlist.length,
        item:itemarr[0],
        qty:itemarr[1],
        price:itemarr[2],
        total:itemarr[1] * itemarr[2],
    }] )
  }

  function deleteitem(index){
    setItemlist(itemlist.filter((ele) => ele.id != index))
  }

  return (
    !canceled && <div className="form-wrapper" style={{position:"absolute",top:"0",backgroundColor: "var(--dark-theme-background)"}}>
        <form onSubmit={handlesubmit} >
            <div className="content">
                <div className="cluster">
                    <BillFrom value={infoid} editmode={editmode}/><br />
                    <BillTo value={infoid} editmode={editmode}/>
                    <Dates value={infoid} editmode={editmode}/>
                </div>
                <div className="another" style={{width:"34rem"}}>
                    <Items handleitems={handleitems} itemlist={itemlist} setItemlist={setItemlist} deleteitem={deleteitem} value={infoid} editmode={editmode}/>
                </div>
            </div>
            <input type="submit" value="save" />    
            <input type="button" value="cancel" onClick={cancel}/>
        </form>
    </div>
  )
}

export default Form