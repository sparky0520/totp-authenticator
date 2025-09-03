import { Link, useParams } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import { useEffect, useState } from "react";

function ServiceInfo() {
  const { services } = useServices();
  const { uuid } = useParams();
  const service = services.find((service) => service.uuid === uuid);

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
    <div className="flex flex-col items-center gap-4">
      <div className="heading">{service.name}</div>
      <div>
        Current OTP: <span className="sub-heading">{service.otp}</span>
      </div>
      <div>
        Valid for:{" "}
        <span className="sub-heading">{timeValid === 0 ? "-" : timeValid}</span>
      </div>
      <Link to={"/"} className="btn-secondary">
        Home
      </Link>
    </div>
  );
}

export default ServiceInfo;
