import { useEffect, useMemo, useState } from "react";

export default function Timer({ toDate }: { toDate: number }) {
  const [countDown, setCountDown] = useState(
    toDate - new Date().getTime() / 1000
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(toDate - new Date().getTime() / 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [toDate]);

  const { days, hours, minutes, seconds } = useMemo(() => {
    const days = Math.floor(countDown / (60 * 60 * 24));
    const hours = Math.floor((countDown % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((countDown % (60 * 60)) / 60);
    const seconds = Math.floor(countDown % 60);

    return { days, hours, minutes, seconds };
  }, [countDown]);

  if (countDown < 0) {
    return <div className="font-bold">Ended</div>;
  } else if (days >= 1) {
    return <div className="font-bold">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</div>;
  } else if (hours >= 1) {
    return <div className="font-bold">{`${hours}h ${minutes}m ${seconds}s`}</div>;
  }
  return <div className="font-bold">{`${minutes}m ${seconds}s`}</div>;
}
