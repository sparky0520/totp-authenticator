import { useState } from "react";
import { generateTOTP } from "../lib/Totp";
import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";

function Register() {
  const { addService } = useServices();

  const [secret, setSecret] = useState("");
  const [name, setName] = useState("");

  function handleGenerate() {
    // pre-calculating uuid to save valid time
    const uuid = crypto.randomUUID();
    // generate otp
    const { otp, expires } = generateTOTP(secret);
    // add a new service
    const payload = { uuid, name, secret, otp, expires };
    addService(payload);
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
      <div className="flex justify-between gap-12 ">
        <Link onClick={handleGenerate} to={"/"} className="btn-primary">
          Register Service
        </Link>
        <Link to={"/"} className="btn-secondary">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default Register;
