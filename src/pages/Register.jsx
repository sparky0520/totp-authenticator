import React, { useRef, useState } from 'react'
import { generateTOTP } from '../lib/Totp'
import { useServices } from '../context/ServiceContext'
import { Link } from 'react-router-dom'

function Register() {
    const { services, addService, removeService } = useServices()

    const [secret, setSecret] = useState('')
    const [name, setName] = useState('')
    const [timeValid, setTimeValid] = useState(null)
    const [otp, setOtp] = useState(null)
    const intervalRef = useRef(null);

    function countDown() {
        setTimeValid(30)
        intervalRef.current = setInterval(() => {
            setTimeValid(prev => {
                if (prev >= 1) {
                    return prev - 1
                } else {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                    return null
                }
            })
        }, 1000)
    }

    function handleGenerate() {
        // if countdown is going on, return
        if (intervalRef.current) {
            return
        }
        // if no countdown, then generate fresh otp
        setOtp(generateTOTP(secret).otp)

        // create a new service
        const uuid = crypto.randomUUID();
        console.log(uuid);
        console.log(name)
        console.log(secret)

        addService({ uuid, name, secret })
        console.log(services)

        // start countdown
        countDown()
    }

    return (
        <div className='flex flex-col justify-center items-center h-full gap-8'>
            <div className='heading'>Register new service</div>
            <div className='flex flex-col gap-2'>
                <div className='sub-heading'>
                    Enter service name
                </div>
                <input type='text' value={name} onChange={e => setName(e.target.value)} className='text-center px-2 py-1 border-b-2 rounded-md sub-heading' />
            </div>
            <div className='flex flex-col gap-2'>
                <div className='sub-heading'>
                    Enter secret
                </div>
                <input type='text' value={secret} onChange={e => setSecret(e.target.value)} className='text-center px-2 py-1 border-b-2 rounded-md sub-heading' />
            </div>
            <button onClick={handleGenerate} className='btn-primary'>Generate OTP</button>
            <div>
                OTP generated: <span className='sub-heading'> {otp === null ? "-" : otp}</span>
            </div>
            <div>
                Valid for <span className='sub-heading'>{timeValid === null ? "-" : timeValid}</span> seconds
            </div>
            <Link to={'/'}>Home Screen</Link>
        </div>
    )
}

export default Register