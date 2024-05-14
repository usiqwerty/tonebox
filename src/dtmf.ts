const horisontal = [1209, 1336, 1477, 1633];
const vertical = [697, 770, 852, 941];
export const dtmfPad = [
    ['1', '2', '3', 'A'],
    ['4', '5', '6', 'B'],
    ['7', '8', '9', 'C'],
    ['*', '0', '#', 'D']];

export const nationalPad = [
    ['na-dial', 'uk-dial', 'eu-dial'],
    ['fr-dial', 'jp-dial']
];
export const blueboxPad = [
    ["tblue-2600", ''],
    ['1', '2', '3', ''],
    ['4', '5', '6', ''],
    ['7', '8', '9', ''],
    ['blue-kp', '0', 'blue-st'],
];
export const redboxPad = [
    ['red-0.05', "red-0.10", "red-0.25", ""],
    ['red-1.00']
];

export function tone(value: string): [number, number] {

    switch (value) {
        case "busy":
            return [480, 620];
        case "idle":
            return [350, 440];
        case "na-dial":
            return [350, 440];
        case "uk-dial":
            return [350, 450];
        case 'eu-dial':
            return [425, 425];
        case 'fr-dial':
            return [440, 440];
        case 'jp-dial':
            return [400, 400];
        case 'blue-2600':
            return [2600, 2600];
        case 'blue-kp':
            return [1100, 1700];
        case 'blue-st':
            return [1500, 1700];
        case "red-0.10":
        case 'red-0.05':
        case "red-0.25":
        case 'red-1.00':
            return [1700, 2200];
        default:
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if (dtmfPad[row][col] === value)
                        return [horisontal[col], vertical[row]];
                }
            }
            return [100, 100];
    }
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