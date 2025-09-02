import React from 'react'
import { useServices } from '../context/ServiceContext'

function Home() {
    const { services, addService, removeService } = useServices()
    return (
        <div className='flex flex-col justify-center items-center h-full gap-8'>
            <div className='heading'>Services</div>
            <div className='border-2 border-accent'>
                {services.map((service) => (
                    <div key={service.uuid}>{service.name}</div>
                ))}
            </div>
        </div>
    )
}

export default Home