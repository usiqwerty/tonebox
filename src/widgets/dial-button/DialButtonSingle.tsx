import "./DialButton.css"
import {Frequency} from "react-frequency";

function DialButtonSingle({value, onPress, onRelease}: { value: string, onPress: any, onRelease: any }) {


    return <button className={"dial-btn dial-btn-single"}
                   value={value}
                   onMouseDown={onPress}
                   onMouseUp={onRelease}>{value}</button>
}

export default DialButtonSingle;