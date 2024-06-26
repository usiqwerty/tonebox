import "./DialButton.css"
import {label} from "../../strings";

function DialButtonTriple({value, onPress, onRelease}: { value: string, onPress: any, onRelease: any }) {


    return <button className={"dial-btn dial-btn-triple"} value={value} onMouseDown={onPress}
                   onMouseUp={onRelease}>{label(value)}</button>
}

export default DialButtonTriple;