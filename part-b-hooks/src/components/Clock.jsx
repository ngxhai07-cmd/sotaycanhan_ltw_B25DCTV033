import { useClock } from '../hooks/useClock';

export default function Clock() {
  const timeString = useClock();
  return <span className="clock-badge">🕒 {timeString}</span>;
}
