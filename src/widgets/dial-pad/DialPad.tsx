import "./DialPad.css";
import DialButtonSingle from "../dial-button/DialButtonSingle";
import {useEffect, useState} from "react";
import {duration, tone} from "../../dtmf";
import DialButtonTriple from "../dial-button/DialButtonTriple";


// @ts-ignore
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();


function DialPad({pad_layout, type}: { type: string, pad_layout: string[][] }) {
    const [isPressed, setIsPressed] = useState(false);
    const [allowStop, setAllowStop] = useState(false);
    const [oscA, setOscA] = useState({} as OscillatorNode);
    const [oscB, setOscB] = useState({} as OscillatorNode);

    function play_tone(freq: number, dur: number) {
        const osc = audioCtx.createOscillator();

        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(audioCtx.destination);
        osc.start();
        setAllowStop(false);

        setTimeout(() => setAllowStop(true), dur);
        return osc;
    }

    function play_sound([a, b]: [number, number], duration: number) {
        setOscA(play_tone(a, duration));
        setOscB(play_tone(b, duration));

    }

    function ccc(i: string) {
        setIsPressed(true);
        const snd = tone(i);
        const [dur, count] = duration(i);

        for (let i = 0; i < count; i++) {
            setTimeout(() => play_sound(snd, dur), dur * (i * 2));
        }
    }

    useEffect(() => {
        if (!isPressed && allowStop) {
            oscA.stop();
            oscB.stop();
        }
    }, [allowStop, isPressed, oscA, oscB]);

    return <div id={"dial-pad"} className={type}>
        {pad_layout.map(row => row.map((i) => {
                if (i === '')
                    return <div key={Math.random()} className={"dial-btn-single"}></div>
                if (i.startsWith('t')) {
                    i = i.substring(1);
                    return <DialButtonTriple key={i} value={i}
                                             onPress={() => ccc(i)}
                                             onRelease={() => setIsPressed(false)}/>
                } else {
                    return <DialButtonSingle key={i} value={i}
                                             onPress={() => ccc(i)}
                                             onRelease={() => setIsPressed(false)}/>
                }
            }
        ))}
    </div>
}

export default DialPad;