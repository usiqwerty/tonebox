import "./DialPad.css";
import DialButtonSingle from "../dial-button/DialButtonSingle";
import {Frequency, useFrequency} from "react-frequency";
import {useEffect, useState} from "react";
import {duration, tone} from "../../dtmf";
import * as timers from "timers";
import DialButtonTriple from "../dial-button/DialButtonTriple";
import PageHeader from "../header/PageHeader";
import {unmountComponentAtNode} from "react-dom";

function play_times(count: number, duration: number) {

}

function DialPad({pad_layout}: { pad_layout: string[][] }) {
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

            if (!isPressed && allowStop)
                setIsPlaying(false);

            const [dur, count] = duration(currButton);
            setTimeout(() => setAllowStop(true), dur);


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
        {pad_layout.map(row => row.map((i) =>
            <DialButtonSingle key={i} value={i}
                              onPress={() => {
                                  setCurrButton(i);
                                  setIsPressed(true);

                                  const [dur, count] = duration(currButton);


                                  for (let i = 1; i < count; i++) {
                                      console.log('start');
                                      setTimeout(() => {
                                          setIsPressed(true);

                                          setTimeout(() => {
                                              setIsPressed(false);
                                          }, 15);
                                      }, dur * 2 * i);

                                  }

                              }}
                              onRelease={() => setIsPressed(false)}
            />))}
    </div>
}

export default DialPad;