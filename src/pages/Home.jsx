import React from 'react'
import { useServices } from '../context/ServiceContext'

function Home() {
    const { services, addService, removeService } = useServices()
    return (
        <div className='flex flex-col items-center h-full gap-8'>
            <div className='heading'>Services</div>
            <div className='flex flex-col gap-4'>
                {services.map((service) => (
                    <div key={service.uuid} className='sub-heading'>{service.name}</div>
                ))}
            </div>
        </div>
    )
}

export default Home