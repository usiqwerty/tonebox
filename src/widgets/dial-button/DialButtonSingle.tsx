import "./DialButton.css"
import {label} from "../../strings";
function DialButtonSingle({value, onPress, onRelease}: { value: string, onPress: any, onRelease: any }) {

    return <button className={"dial-btn dial-btn-single"}
                   value={value}
                   onTouchStart={onPress}
                   onTouchEnd={onRelease}

                   onMouseDown={'ontouchend' in window? ()=>{} :onPress}
                   onMouseUp={'ontouchstart' in window?  ()=>{}: onRelease}
        >{label(value)}</button>
}

export default DialButtonSingle;