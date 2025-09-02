import React from 'react'
import { ServicesHook } from '../context/ServiceContext'

function Home() {
    const { services, addServices, removeServices } = ServicesHook()
    return (
        <div className='flex flex-col justify-center items-center h-full gap-8'>
            <div>Hello</div>
            {services.forEach((service, index) => (
                <div key={service.uuid}>{service.name} </div>
            ))}
        </div>
    )
}

export default Home