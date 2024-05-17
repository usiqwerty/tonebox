const labels = {
    "na-dial": "North America",
    "uk-dial": "UK dial",
    "eu-dial": "Europe dial",
    "fr-dial": "France dial",
    "jp-dial": "Japan dial",
    "blue-2600": "2600",
    "blue-kp": "KP",
    "blue-st": "ST",
    "blue-1": "1",
    "blue-2": "2",
    "blue-3": "3",
    "blue-4": "4",
    "blue-5": "5",
    "blue-6": "6",
    "blue-7": "7",
    "blue-8": "8",
    "blue-9": "9",
    "blue-0": "0",
    "red-0.05":"5 cents",
    "red-0.10":"10 cents",
    "red-0.25":"25 cents",
    "red-1.00":"100 cents",
} as { [k: string]: string };

export function label(key_code: string) {
    if (labels.hasOwnProperty(key_code))
        return labels[key_code];
    return key_code;
}