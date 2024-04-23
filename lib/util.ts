const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const MONTH = DAY * 28
export function ago(date: number): string {
  const diff = Math.floor((Date.now() - date) / 1e3)
  if (diff < MINUTE) {
    return `${diff}s`
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}m`
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}h`
  } else if (diff < MONTH) {
    return `${Math.floor(diff / DAY)}d`
  } else {
    // TODO: convert to md format
    return new Date(date).toLocaleDateString()
  }
}

export function formatNumber(number: number): string {
  // Instagram is unlikely to have a number in the trillions, so we only go up to billions here
  if (number >= 1e9) {
    return (number / 1e9).toFixed(1) + "B";
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(1) + "M";
  } else if (number >= 1e3) {
    return (number / 1e3).toFixed(1) + "K";
  } else {
    return number.toString();
  };
}