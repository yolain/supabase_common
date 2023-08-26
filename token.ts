import {time} from "./utils.ts";

const secret_key = Deno.env.get('JWT_SECRET') || 'super-secret-jwt-token-with-at-least-32-characters-long'
const _expire_time = 60 * 60 * 24 * 0 // 7 days

// Generate Token
export const generate_token = async (id:string,expire_time:number,client) => {
    const {data,error} =  await client.rpc('generate_token',{
        payload:JSON.stringify({
            "id":id,
            "expire_time":expire_time || time() + _expire_time
        }),
        secret:secret_key,
        algorithm:'HS256'
    })
    if(data) return data
    else return false
}

// Verify Token
export const verify_token = async (token:string,client) => {
    const {data,error} = await client.rpc('verify_token',{
        token:token,
        secret:secret_key,
        algorithm:'HS256'
    })
    if(data && !error){
        try{
            const {valid,params} = data
            if(valid){
                const payload = JSON.parse(params)
                if(payload.expire_time >= time()) return payload.id
                else return false
            }
            else return false
        }
        catch (e){
            return false
        }
    }
    else return false
}
