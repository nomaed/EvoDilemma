let textarea: HTMLTextAreaElement;

export function setLogger(area: HTMLTextAreaElement) {
    textarea = area;
}

export function log(...text: Array<any>) {
    textarea.innerHTML = textarea.innerHTML + text.map(txt => String(txt)).join(" ");
}
