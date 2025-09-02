import React, { createContext, useContext, useState } from 'react'

// create context
const ServiceContext = createContext()

// custom hook 
export const ServicesHook = () => useContext(ServiceContext)

export function ServiceProvider({ children }) {
    const [services, servicesSet] = useState([])

    // Functions to manipulate the state
    const addService = (service) => {
        servicesSet(prev => [...prev, service])
    }

    const removeService = (serviceId) => {
        servicesSet(prev => prev.filter(service => service.id != serviceId))
    }

    return (
        <ServiceContext.Provider value={{ services, addService, removeService }}>
            {children}
        </ServiceContext.Provider>
    )
}
