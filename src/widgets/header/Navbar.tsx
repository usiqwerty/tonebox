import {Link} from "react-router-dom";
import "./navbar.css";

function Navbar({page}: { page: string }) {
    const tone_active = page === 'tone';
    const national_active = page === 'national';
    const blue_active = page === 'blue';
    const red_active = page === 'red';


    return <div id={'navbar'}>
        <div className={tone_active ? ' nav-active' : 'nav-link'}><Link to={"/"}>Dial pad</Link></div>
        <div className={national_active ? 'nav-active' : 'nav-link'}><Link to={"/national"}>National</Link></div>
        <div className={blue_active ? ' nav-active' : 'nav-link'}><Link to={"/bluebox"}>Bluebox</Link></div>
        <div className={red_active ? ' nav-active' : 'nav-link'}><Link to={"/redbox"}>Redbox</Link></div>
    </div>
}

export default Navbar;