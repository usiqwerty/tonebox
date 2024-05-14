import "./DialButton.css"
import {Frequency} from "react-frequency";
function DialButtonTriple({value, onPress, onRelease}:{value: string, onPress:any, onRelease:any}) {


    return <button className={"dial-btn dial-btn-triple"} value={value} onMouseDown={onPress} onMouseUp={onRelease}>{value}</button>
}

export default DialButtonTriple;