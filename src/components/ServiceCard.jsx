import { useEffect, useState } from "react";

function ServiceCard({ service }) {
  const calculateTimeLeft = () => {
    const millisecondsLeft = service.expires - Date.now();
    return millisecondsLeft > 0 ? Math.floor(millisecondsLeft / 1000) : 0;
  };
  const [timeValid, setTimeValid] = useState(calculateTimeLeft);

  useEffect(() => {
    let interval = null;

    if (timeValid > 0) {
      interval = setInterval(() => {
        setTimeValid((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [service.expires]); // reset timer if expires changes

  return (
    <div className="flex justify-between gap-12 border-[1px] card">
      <div>{service.name}</div>
      <div className="sub-heading ">{timeValid === 0 ? "-" : timeValid}</div>
    </div>
  );
}

export default ServiceCard;
