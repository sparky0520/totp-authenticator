import { useEffect, useState } from "react";

function ServiceCard({ service }) {
  const calculateTimeLeft = () => {
    const millisecondsLeft = service.expires - Date.now();
    return millisecondsLeft > 0 ? Math.floor(millisecondsLeft / 1000) : 0;
  };
  const [timeValid, setTimeValid] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.floor((service.expires - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeValid(0);
        clearInterval(interval);
      } else {
        setTimeValid(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [service.expires]);

  return (
    <div className="flex justify-between gap-12 border-[1px] card">
      <div>{service.name}</div>
      <div className="sub-heading ">{timeValid === 0 ? "-" : timeValid}</div>
    </div>
  );
}

export default ServiceCard;
