import "./Decision.css"

function Decision(props) {
    const {status, mode} = props
    if (status === "paid"){
        return <div className="status" style={{backgroundColor:`var(${mode ? "--dark":"--light"}-theme-paid-back-color)`,color:`var(${mode ? "--dark":"--light"}-theme-paid-font-color)`}}>
            <div className="text">| {status}</div>
        </div>
    } else if (status === "pending"){
        return <div className="status" style={{backgroundColor:`var(${mode ? "--dark":"--light"}-theme-pending-back-color)`,color:`var(${mode ? "--dark":"--light"}-theme-pending-font-color)`}}>
            <div className="text">| {status}</div>
        </div>
    }
}

export default Decision