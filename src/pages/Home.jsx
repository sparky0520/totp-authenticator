import { useServices } from "../context/ServiceContext";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

function Home() {
  const { services } = useServices();

  return (
    <div className="flex flex-col items-center h-full w-full gap-8 pb-6">
      <div className="heading">Services</div>
      <div className="flex flex-col gap-4">
        {services.length > 0
          ? services.map((service) => (
              <Link to={`/${service.uuid}`} key={service.uuid}>
                <ServiceCard service={service} />
              </Link>
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
