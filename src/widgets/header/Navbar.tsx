import {Link} from "react-router-dom";
import "./navbar.css";
function Navbar(){
    return <div id={'navbar'}>
        <div><Link to={"/"}>Home</Link></div>
        <div><Link to={"/national"}>National</Link></div>
        <div><Link to={"/bluebox"}>Bluebox</Link></div>
        <div><Link to={"/redbox"}>Redbox</Link></div>
    </div>
}
export default Navbar;