export function toDateTime(secs) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    // ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}
    return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}
    `;
}