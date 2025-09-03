import React, { useRef, useState } from "react";
import { generateTOTP } from "../lib/Totp";
import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";

function Register() {
  const { addService } = useServices();

  const [secret, setSecret] = useState("");
  const [name, setName] = useState("");
  const [timeValid, setTimeValid] = useState(null);
  const [otp, setOtp] = useState(null);
  const intervalRef = useRef(null);

  function countDown() {
    setTimeValid(30);
    intervalRef.current = setInterval(() => {
      setTimeValid((prev) => {
        if (prev >= 1) {
          return prev - 1;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return null;
        }
      });
    }, 1000);
  }

  function handleGenerate() {
    // if countdown is going on, return
    if (intervalRef.current) {
      return;
    }

    // if no countdown, then generate fresh otp
    const { otp, expires } = generateTOTP(secret);
    setOtp(otp);
    console.log(`OTP: ${otp}`);
    console.log(`Time now: ${Date.now()}`);
    console.log(`Expires: ${expires}`);
    console.log(`Time Left: ${(expires - Date.now()) / 1000}`);

    // create a new service
    const uuid = crypto.randomUUID();
    const payload = { uuid, name, secret, otp, expires };
    addService(payload);

    // start countdown
    countDown();
  }

  return (
    <div className="flex flex-col items-center h-full gap-8">
      <div className="heading">Register new service</div>
      <div className="flex flex-col gap-2 items-center">
        <div className="sub-heading">Enter secret</div>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="text-center px-2 py-1 border-b-2 rounded-md sub-heading"
        />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="sub-heading">Enter service name</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-center px-2 py-1 border-b-2 rounded-md sub-heading"
        />
      </div>
      <button onClick={handleGenerate} className="btn-primary">
        Generate OTP
      </button>
      <div>
        OTP generated:{" "}
        <span className="sub-heading"> {otp === null ? "-" : otp}</span>
      </div>
      <div>
        Valid for{" "}
        <span className="sub-heading">
          {timeValid === null ? "-" : timeValid}
        </span>{" "}
        seconds
      </div>
      <Link to={"/"} className="btn-secondary">
        Home Screen
      </Link>
    </div>
  );
}

export default Register;
