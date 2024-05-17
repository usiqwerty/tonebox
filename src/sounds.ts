import {dtmf_tones} from "./widgets/pads/dtmf";
import {blue_tones} from "./widgets/pads/blue";
import {red_tones} from "./widgets/pads/red";
import {national_tones} from "./widgets/pads/national";

const all_tones = [
    dtmf_tones,
    blue_tones,
    red_tones,
    national_tones
];

export function tone(value: string): [number, number] {
    for (const tone_dict of all_tones) {
        if (tone_dict.hasOwnProperty(value))
            return tone_dict[value];
    }
    return [100, 100];
}

export function duration(value: string): [number, number] {
    switch (value) {
        case 'red-0.05':
            return [66, 1];
        case "red-0.10":
            return [66, 2];
        case "red-0.25":
            return [33, 5];
        case 'red-1.00':
            return [650, 1];
        default:
            return [150, 1];
    }
}