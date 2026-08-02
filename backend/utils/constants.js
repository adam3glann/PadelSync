export const TIME_BLOCKS = [
    "09:00 - 10:30",
    "10:30 - 12:00",
    "12:00 - 13:30",
    "16:30 - 18:00",
    "18:00 - 19:30",
    "19:30 - 21:00"
];

// Local (server) "today" as YYYY-MM-DD
export const localDateString = (date = new Date()) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

// Real calendar date check (validates month length and leap years).
const isRealDate = (date) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || "");
    if (!match) return false;
    const [, y, m, d] = match.map(Number);
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (m === 2 && (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0))) monthLengths[1] = 29;
    return d <= monthLengths[m - 1];
};

// Validates a YYYY-MM-DD string. When opts.maxDays is set, the date must be
// within [today, today + maxDays]. When opts.allowPast is false the date must
// not be before today.
export const isValidDate = (date, opts = {}) => {
    if (!isRealDate(date)) return false;
    if (!opts.maxDays && opts.allowPast !== false) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = date.split("-").map(Number);
    const target = new Date(y, m - 1, d);
    const diffDays = Math.round((target - today) / 86400000);
    if (diffDays < 0 && opts.allowPast !== true) return false;
    if (opts.maxDays && diffDays > opts.maxDays) return false;
    return true;
};
