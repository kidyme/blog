export function formatDate(pattern) {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1; // getMonth() 返回 0-11
  const y = date.getFullYear();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();

  return pattern
    .replace(/YYYY/g, y)
    .replace(/MM/g, m.toString().padStart(2, "0"))
    .replace(/DD/g, d.toString().padStart(2, "0"))
    .replace(/hh/g, hh.toString().padStart(2, "0"))
    .replace(/mm/g, mm.toString().padStart(2, "0"))
    .replace(/ss/g, ss.toString().padStart(2, "0"));
}
