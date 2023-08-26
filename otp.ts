import * as OTPAuth from "https://deno.land/x/otpauth@v9.1.3/dist/otpauth.esm.min.js"

// create a new otp
export const createTOTP = (issuer,label,secret = null) => {
    if(!secret) secret = new OTPAuth.Secret({size:10})
    else secret = OTPAuth.Secret.fromBase32(secret)
    let totp = new OTPAuth.TOTP({
        issuer,
        label,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret
    })
    const uri = totp.toString();
    return {secret:secret.base32,uri}
}

// verify the otp
export const verifyTOTP = (uri,code) => {
    const totp = OTPAuth.URI.parse(uri);
    console.log(totp)
    // const delta = totp.validate({token:code,window:1});
    const token = totp.generate()
    return token == code
}
