export function toCapitalCase(s: string) {
    return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function getJSDateFromFirestoreDate(key: { _seconds: number, _nanoseconds: number }) {
    return JSON.stringify(new Date(key._seconds * 1000 + key._nanoseconds / 1_000_000));
}

export function normalizeDateToYMD(val: string | Date | null | undefined) {
    if (!val) return null;
    if (typeof val === 'string') {
        // If it's an ISO-like full datetime, extract date part
        // Accept either "YYYY-MM-DD" or full ISO "2025-11-06T00:00:00.000Z"
        const m = val.match(/^(\d{4}-\d{2}-\d{2})/);
        return m ? m[1] : val;
    }
    if (val instanceof Date) {
        // toISOString() -> "YYYY-MM-DDTHH:mm:ss.sssZ", take date portion
        return val.toISOString().slice(0, 10);
    }
    // fallback
    const s = String(val);
    const mm = s.match(/^(\d{4}-\d{2}-\d{2})/);
    return mm ? mm[1] : s;
}