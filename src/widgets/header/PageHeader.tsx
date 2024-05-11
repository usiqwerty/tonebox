import "./PageHeader.css";
import Navbar from "./Navbar";
import React from "react";
function PageHeader({type}:{type:string}){
    return<>
        <h1 className={type+"-header"}>{type}box</h1>
        <Navbar />
    </> ;
}
export default PageHeader;