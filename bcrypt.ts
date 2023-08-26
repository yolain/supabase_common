import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
export function password_hash(password){
    try{
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        if(hash) return hash
    }
    catch (e) {
        return false
    }
}
export function password_verify(password,hash){
    try{
        return bcrypt.compareSync(password, hash)
    }
    catch (e){
        return false
    }
}

