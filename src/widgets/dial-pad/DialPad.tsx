import "./DialPad.css";
import DialButtonSingle from "../dial-button/DialButtonSingle";
import {Frequency, useFrequency} from "react-frequency";
import {useEffect, useState} from "react";
import {tone} from "../../dtmf";
import * as timers from "timers";

function DialPad() {
    const [freqA, setFreqA] = useState(100);
    const [freqB, setFreqB] = useState(100);
    const [currButton, setCurrButton] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [allowStop, setAllowStop] = useState(false);
    const oscA = useFrequency({hz: freqA, type: "center", gain: 1, oscillator: "sine"});
    const oscB = useFrequency({hz: freqB, type: "center", gain: 1, oscillator: "sine"});

    useEffect(() => {
        if (isPlaying) {
            // setIsPressed(true);
            const [a, b] = tone(currButton);
            setFreqA(a);
            setFreqB(b);
            oscA.start();
            oscB.start();

            setTimeout(()=>{setAllowStop(true)},250);
            if (!isPressed && allowStop)
                setIsPlaying(false);
        } else {
            if (isPressed) {
                setAllowStop(false);
                setIsPlaying(true);
            } else {
                oscA.stop();
                oscB.stop();
                setIsPlaying(false);
                setIsPressed(false);
            }
        }
    }, [allowStop, currButton, isPlaying, isPressed, oscA, oscB]);

    return <div id={"dial-pad"}>
        {"123456789".split('').map((i) =>
            <DialButtonSingle key={i} value={i}
                              onPress={() => {
                                  setCurrButton(i);
                                  setIsPressed(true);
                              }}
                              onRelease={()=>setIsPressed(false)}
            />)}

    </div>
}

export default DialPad;