import "./DialPad.css";
import DialButtonSingle from "../dial-button/DialButtonSingle";
import {useEffect, useState} from "react";
import {duration, tone} from "../../dtmf";


// @ts-ignore
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();


function DialPad({pad_layout}: { pad_layout: string[][] }) {
    const [isPressed, setIsPressed] = useState(false);
    const [allowStop, setAllowStop] = useState(false);
    const [oscA, setOscA] = useState({} as OscillatorNode);
    const [oscB, setOscB] = useState({} as OscillatorNode);

    function play_tone(freq: number, dur: number) {
        const oscillator = audioCtx.createOscillator();

        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        setAllowStop(false);


        setTimeout(
            function () {
                setAllowStop(true);
            }, dur);
        return oscillator;
    }

    useEffect(() => {
        if (!isPressed && allowStop) {
            oscA.stop();
            oscB.stop();
        }
    }, [allowStop, isPressed, oscA, oscB]);

    function playNote([a, b]: [number, number], duration: number) {
        setOscA(play_tone(a, duration));
        setOscB(play_tone(b, duration));

    }

    return <div id={"dial-pad"}>
        {pad_layout.map(row => row.map((i) =>
            <DialButtonSingle key={i} value={i}
                              onPress={() => {
                                  setIsPressed(true);

                                  const [a, b] = tone(i);
                                  const [dur, count] = duration(i);
                                  for (let i = 0; i < count; i++) {
                                      setTimeout(() => {
                                          playNote([a, b], dur);
                                      }, dur * i * 2);

                                  }
                              }}
                              onRelease={() => setIsPressed(false)}
            />))}
    </div>
}

export default DialPad;