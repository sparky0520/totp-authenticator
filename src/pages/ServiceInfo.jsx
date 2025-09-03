/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useServices } from "../context/ServiceContext";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { generateTOTP } from "../lib/Totp";

function ServiceInfo() {
  const { services, removeService, updateService } = useServices();
  const { uuid } = useParams();
  const [service, setService] = useState(
    services.find((service) => service.uuid === uuid)
  );

  if (!service) {
    return <div className="text-center sub-heading">Not found</div>;
  }

  let navigate = useNavigate();
  const inputRef = useRef(null);
  const [timeValid, setTimeValid] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.floor((service.expires - Date.now()) / 1000);
      if (remaining <= 0) {
        // set time
        setTimeValid(null);
        // generate otp
        const { otp, expires } = generateTOTP(service.secret);
        // update service
        let temp = service;
        temp.otp = otp;
        temp.expires = expires;
        setService(temp);
        updateService(temp);
      } else {
        setTimeValid(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDelete() {
    removeService(uuid);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 items-center">
        <input
          ref={inputRef}
          className="heading border-0 w-60 text-center"
          type="text"
          value={service.name}
          onChange={(e) => {
            let temp = service;
            temp.name = e.target.value;
            setService(temp);
            updateService(temp);
          }}
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
        <span className="sub-heading">{timeValid ?? "-"} seconds</span>
      </div>
      <Link to={"/"} className="btn-secondary">
        Home
      </Link>
    </div>
  );
}

export default ServiceInfo;
