import "./DialPad.css";
import DialButtonSingle from "../dial-button/DialButtonSingle";
import {useFrequency} from "react-frequency";
import {useEffect, useState} from "react";
import {duration, tone} from "../../dtmf";

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function DialPad({pad_layout}: { pad_layout: string[][] }) {
    const [freqA, setFreqA] = useState(100);
    const [freqB, setFreqB] = useState(100);
    const [currButton, setCurrButton] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [allowStop, setAllowStop] = useState(false);
    const oscA = useFrequency({hz: freqA, oscillator: "sine"});
    const oscB = useFrequency({hz: freqB, oscillator: "sine"});

    function play_single(key: string, dur: number) {
        setCurrButton(key);
        setIsPressed(true);
        setAllowStop(false);

        console.log("start");

        setTimeout(() => {
            console.log("stop");
            setAllowStop(true);
        }, dur);

    }

    function play_sound(key: string) {
        const [dur, count] = duration(currButton);

        for (let i = 0; i < count; i += 2) {
            console.log("Playing sound", dur, "ms");
            play_single(key, dur);
        }
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
                                  play_sound(i);
                              }}
                              onRelease={() => setIsPressed(false)}
            />))}
    </div>
}

export default DialPad;