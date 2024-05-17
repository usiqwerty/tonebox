import "./PageHeader.css";
import Navbar from "./Navbar";
import React from "react";

const headers = {
    "tone": "tone",
    "national": 'tone',
    "blue": "blue",
    "red": "red"
} as {[key: string]: string}

function PageHeader({type}: { type: string }) {
    return <>
        <h1 className={type + "-header"}>{headers[type]}box</h1>
        <Navbar page={type}/>
    </>;
}

export default PageHeader;