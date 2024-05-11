const horisontal = [1209, 1336, 1477, 1633];
const vertical = [679, 770, 852, 941];
const pad = [
    ['1', '2', '3', 'A'],
    ['4', '5', '6', 'B'],
    ['7', '8', '9', 'C'],
    ['*', '0', '#', 'D']];

export function tone(value: string) {

    switch (value){
        case "busy":
            return [480, 620];
        case "idle":
            return [350, 440];
        default:
            for (let row=0;row<4; row++){
                for(let col=0; col<4; col++){
                    if( pad[row][col] === value)
                        return [horisontal[col], vertical[row]];
                }
            }
            return [100, 100];
    }
}