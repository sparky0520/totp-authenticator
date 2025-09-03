import { createContext, useContext, useEffect, useState } from "react";

// create context
const ServiceContext = createContext();

// custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useServices = () => useContext(ServiceContext);

export function ServiceProvider({ children }) {
  const [services, setServices] = useState(() => {
    // check for locally saved services
    const saved = localStorage.getItem("services");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save to localStorage whenever items changes (in the bg after rendering complete)
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  // Functions to manipulate the state
  const addService = (service) => {
    setServices((prev) => [...prev, service]);
  };

  const removeService = (serviceId) => {
    setServices((prev) => prev.filter((service) => service.id != serviceId));
  };

  return (
    <ServiceContext.Provider value={{ services, addService, removeService }}>
      {children}
    </ServiceContext.Provider>
  );
}
