import React, { createContext, useContext, useState } from 'react'

// create context
const ServiceContext = createContext()

// custom hook 
export const useServices = () => useContext(ServiceContext)

export function ServiceProvider({ children }) {
    const [services, setServices] = useState([])

    // Functions to manipulate the state
    const addService = (service) => {
        setServices(prev => [...prev, service])
    }

    const removeService = (serviceId) => {
        setServices(prev => prev.filter(service => service.id != serviceId))
    }

    return (
        <ServiceContext.Provider value={{ services, addService, removeService }}>
            {children}
        </ServiceContext.Provider>
    )
}
