import { useState } from "react";
import { generateTOTP } from "../lib/Totp";
import { useServices } from "../context/ServiceContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const { addService } = useServices();
  const navigate = useNavigate();
  const [secret, setSecret] = useState("");
  const [name, setName] = useState("");

  function handleGenerate() {
    if (name.length > 0 && secret.length > 0) {
      // pre-calculating uuid to save valid time
      const uuid = crypto.randomUUID();
      // generate otp
      const { otp, expires } = generateTOTP(secret);
      // add a new service
      const payload = { uuid, name, secret, otp, expires };
      addService(payload);
      // navigate to service page for otp
      navigate(`/${uuid}`);
    } else {
      alert("Name and secret can't be empty");
    }
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
      <div className="flex justify-between gap-12 pb-6">
        <button onClick={handleGenerate} className="btn-primary">
          Register Service
        </button>
        <Link to={"/"} className="btn-secondary">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default Register;
