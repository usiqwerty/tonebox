import React from 'react';

import './App.css';
import DialPad from "./widgets/dial-pad/DialPad";
import {dtmfPad} from "./widgets/pads/dtmf";
import {Outlet, Route, Routes} from "react-router";
import PageHeader from "./widgets/header/PageHeader";
import Navbar from "./widgets/header/Navbar";
import {nationalPad} from "./widgets/pads/national";
import {blueboxPad} from "./widgets/pads/blue";
import {redboxPad} from "./widgets/pads/red";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<>
                    <PageHeader type={"tone"}/>
                    <DialPad type={"tone"} pad_layout={dtmfPad}/>
                </>}/>
                <Route path={"/national"} element={<>
                    <PageHeader type={"national"}/>
                    <DialPad type={"national"}  pad_layout={nationalPad}/>
                </>}/>
                <Route path={"/bluebox"} element={<>
                    <PageHeader type={"blue"}/>
                    <DialPad type={'bluebox'} pad_layout={blueboxPad}/>
                </>}/>
                <Route path={"/redbox"} element={<>
                    <PageHeader type={"red"}/>
                    <DialPad type={'redbox'} pad_layout={redboxPad}/>
                </>}/>
            </Routes>
</div>
)
    ;
}

export default App;
