let corsHeaders:HeadersInit = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type,authorization, x-client-info, x-lang, apikey',
}

export const initCors = (cors:HeadersInit) =>{
    corsHeaders = cors
}
/* Return Success
 * @params {Boolean} data
 * @params {Number} code
 * @params {String} message
*/
export const success = (data:boolean = null,code:number = 1,message:string = 'SUCCESS') =>{
    return resp({ret:1,data,code,message})
}

/* Return Fail
 * @params {String} message
 * @params {Number} code
 * @params {Boolean} data
*/
export const fail = (message:string = 'FAIL',code:number = 0,data:string = null)  =>{
    return resp({ret:0,data,code,message})
}

export const resp:Function = (res:Response | string,responseStatus:number = 200,contentType:string) =>{
    if(res == 'ok') return new Response('ok', {headers:corsHeaders})
    else return new Response(JSON.stringify(res),
        {
            headers: {...corsHeaders, "Content-Type": contentType || "application/json"},
            status: responseStatus || 200,
        }
    )
}

