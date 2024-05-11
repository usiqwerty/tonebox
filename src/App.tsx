import React from 'react';

import './App.css';
import DialPad from "./widgets/dial-pad/DialPad";
import {dtmfPad, nationalPad, blueboxPad, redboxPad} from "./dtmf";
import {Outlet, Route, Routes} from "react-router";
import PageHeader from "./widgets/header/PageHeader";
import Navbar from "./widgets/header/Navbar";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<>
                    <PageHeader type={"tone"}/>
                    <DialPad pad_layout={dtmfPad}/>
                </>}/>
                <Route path={"/national"} element={<>
                    <PageHeader type={"tone"}/>
                    <DialPad pad_layout={nationalPad}/>
                </>}/>
                <Route path={"/bluebox"} element={<>
                    <PageHeader type={"blue"}/>
                    <DialPad pad_layout={blueboxPad}/>
                </>}/>
                <Route path={"/redbox"} element={<>
                    <PageHeader type={"red"}/>
                    <DialPad pad_layout={redboxPad}/>
                </>}/>
            </Routes>
</div>
)
    ;
}

export default App;
