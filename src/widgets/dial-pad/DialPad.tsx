import "./DialPad.css";
import DialButtonSingle from "../dial-button/DialButtonSingle";
import {useFrequency} from "react-frequency";
import {useEffect, useState} from "react";
import {duration, tone} from "../../dtmf";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


// @ts-ignore
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();



function DialPad({pad_layout}: { pad_layout: string[][] }) {
    const [freqA, setFreqA] = useState(100);
    const [freqB, setFreqB] = useState(100);
    const [currButton, setCurrButton] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [allowStop, setAllowStop] = useState(false);
    const oscA = useFrequency({hz: freqA, oscillator: "sine"});
    const oscB = useFrequency({hz: freqB, oscillator: "sine"});

    function play_tone(freq: number, dur: number) {
        const oscillator = audioCtx.createOscillator();

        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscillator.connect(audioCtx.destination);
        oscillator.start();

        setTimeout(
            function () {
                oscillator.stop();
            }, dur);
    }

    function playNote([a, b]: [number, number], duration: number) {
        play_tone(a, duration);
        play_tone(b, duration);
    }
    useEffect(() => {
        if (allowStop) {
            if (!isPressed) {
                oscA.stop();
                oscB.stop();
            }
        } else {
            if (isPressed) {
                const [a, b] = tone(currButton);
                setFreqA(a);
                setFreqB(b);
                oscA.start();
                oscB.start();
            }
        }
    }, [allowStop, currButton, isPressed, oscA, oscB]);

    // useEffect(() => {
    //     if (isPlaying) {
    //         // setIsPressed(true);
    //
    //
    //         if (!isPressed && allowStop)
    //             setIsPlaying(false);
    //
    //         const dur = duration(currButton)[0];
    //         setTimeout(() => setAllowStop(true), dur);
    //
    //
    //     } else {
    //         if (isPressed) {
    //             setAllowStop(false);
    //             setIsPlaying(true);
    //         } else {
    //             oscA.stop();
    //             oscB.stop();
    //             setIsPlaying(false);
    //             setIsPressed(false);
    //         }
    //     }
    // }, [allowStop, currButton, isPlaying, isPressed, oscA, oscB]);

    return <div id={"dial-pad"}>
        {pad_layout.map(row => row.map((i) =>
            <DialButtonSingle key={i} value={i}
                              onPress={() => {
                                  // play_sound(i);
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