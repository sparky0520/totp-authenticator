/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ServiceInfo() {
  const { services, removeService } = useServices();
  const { uuid } = useParams();
  const service = services.find((service) => service.uuid === uuid);

  if (!service) {
    return <div className="text-center sub-heading">Not found</div>;
  }

  const [name, setName] = useState(service.name);
  let navigate = useNavigate();
  const inputRef = useRef(null);

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

  function handleDelete() {
    removeService(uuid);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 items-center">
        <input
          ref={inputRef}
          className="heading border-0 w-max"
          type="text"
          value={name}
          onChange={(e) =>
            setName(() => {
              // BUG: only temporarily changes
              service.name = e.target.value;
              return e.target.value;
            })
          }
        ></input>
        <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => inputRef.current.focus()}
        />
      </div>
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
