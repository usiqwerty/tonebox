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

    const [playingOscillators, setPlayingOscillators] = useState([] as OscillatorNode[]);

    function play_tone(freq: number, [dur, count]: [number, number]) {
        let oscillators = [];
        for (let i = 0; i < count; i++) {
            const osc = audioCtx.createOscillator();

            osc.frequency.value = freq;
            osc.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + dur / 1000 * 2 * i);
            oscillators.push(osc);
            
            setTimeout(() => {
                setAllowStop(true);
            }, dur * (2 * i + 1))
        }
        return oscillators;
    }

    function play_sound([a, b]: [number, number], duration: [number, number]) {
        let newosc = playingOscillators.concat(play_tone(a, duration));
        newosc = newosc.concat(play_tone(b, duration));
        setPlayingOscillators(newosc);
    }

    function ccc(i: string) {
        setIsPressed(true);
        setAllowStop(false);
        play_sound(tone(i), duration(i));
    }

    useEffect(() => {
        if (playingOscillators.length && allowStop) {
            if(!isPressed) {
                playingOscillators.forEach(osc => osc.stop())
                setPlayingOscillators([]);
            }
        }
    }, [allowStop, isPressed, playingOscillators]);

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