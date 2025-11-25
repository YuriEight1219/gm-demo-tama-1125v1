export function getJstNow() {
    // Returns a Date object representing the current time in JST (Asia/Tokyo).
    // The internal time value might not be "correct" in terms of UTC, 
    // but getHours(), getDate(), etc. will return JST values.
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
}

export function createJstDate(dateStr: string, timeStr?: string) {
    // dateStr: YYYY-MM-DD
    // timeStr: HH:MM (optional)
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr ? timeStr.split(':').map(Number) : [0, 0];

    // Create date using local system time constructor, which matches getJstNow's behavior
    // (both projected to local time components)
    return new Date(year, month - 1, day, hours, minutes);
}
