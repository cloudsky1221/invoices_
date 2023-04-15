import Decision from "../Decision/Decision"
import "./List.css"

const List = ({ id, number, date, name, amount, status , mode, showlist, setShowList, index, setGetId}) => {
    return (
        <div className="first-visual" onClick={() => {setShowList(!showlist);setGetId(index)}}>
            <ul style={{backgroundColor:`var(${mode ? "--dark":"--light"}-theme-single-list)`,color:`var(${mode ? "--dark":"--light"}-theme-font-color)`}}>
                <li style={{color:`var(${mode ? "--dark":"--light"}-theme-font-dark-color)`,fontWeight:"500"}}>{number}</li>
                <li style={{color:`var(${mode ? "--dark":"--light"}-theme-font-light-color)`,fontSize:"1.2rem"}}>{date}</li>
                <li style={{color:`var(${mode ? "--dark":"--light"}-theme-font-light-color)`,fontSize:"1.2rem"}}>{name}</li>
                <li style={{color:`var(${mode ? "--dark":"--light"}-theme-font-light-color)`,fontSize:"1.2rem"}}>Rs. {amount}</li>
                <li><Decision mode={mode} status={status} /></li>
                {/* {decide(mode, status)} */}
            </ul>
        </div>
    )
}

export default List