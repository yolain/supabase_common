
export const getHeaders = (headers: Headers) => {
    const xRealIp:string = headers.get('x-real-ip') || ''
    const xForwardedFor:string[] = headers.get('x-forwarded-for')?.split(/\s*,\s*/) || ['']
    return {
        lang:headers.get('x-lang') || headers.get('accept-language')?.split(',')?.[0] || 'en',
        userAgent:headers.get('user-agent') || '',
        platform:headers.get('sec-ch-ua-platform') ? JSON.parse(headers.get('sec-ch-ua-platform')) : '',
        host:headers.get('host') || '',
        referrer:headers.get('referrer') || '',
        xRealIp,
        xForwardedFor,
        ip:xRealIp || xForwardedFor[xForwardedFor.length-1] || null
    }
}
