import React from "react";
import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";

function Home() {
  const { services } = useServices();
  return (
    <div className="flex flex-col items-center h-full gap-8">
      <div className="heading text-center">Services</div>
      <div className="flex flex-col gap-4">
        {services.length > 0
          ? services.map((service) => (
              <div key={service.uuid} className="sub-heading">
                {service.name}
              </div>
            ))
          : "No services registered."}
      </div>
      <Link to={"/register"} className="btn-secondary">
        Register Service
      </Link>
    </div>
  );
}

export default Home;
