import { TOTP } from 'totp-generator';

export function generateTOTP(secret){
    return TOTP.generate(secret)
}