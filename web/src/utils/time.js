import { format } from 'date-fns';

export function formatTime(timestamp, pattern) {
  const date = new Date(timestamp);
  return format(date, pattern.replace(/[Yy]+/g, 'y').replace(/[Dd]+/g, 'd').replace(/[Hh]+/g, 'H').replace(/[Ss]+/g, 's'));
}
