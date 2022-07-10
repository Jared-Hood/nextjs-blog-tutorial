import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString.slice(0, 10)); // just get YYY-MM-DD and remove time string
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}