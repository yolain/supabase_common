# Supabase Common

### Usage 

```typescript
import * as common from "https://deno.land/x/supabase_common/mod.ts"

```

#### TOTP

```typescript
const { TOTP} = common
const { createTOTP,verifyTOTP } = TOTP
// Create TOTP
const {secret:any,uri:string} = createTOTP(project_name,user_name,google2fa_secret)

// Verify TOTP
const isCodeCorrect = verifyTOTP(params.uri,params.google2fa_code)
```

#### Token

Add database functions on supabase

1. generate token
```postgresql
begin
    return extensions.generate(
        payload:= payload,
        secret:= secret,
        algorithm:= algorithm,
    );
end;
```
2. verify_token
```postgresql  
  declare
    params json;
    pass boolean;
  begin
    select payload,valid
    into params,pass
    from extensions.verify(
        token:= token,
        secret:= secret,
        algorithm:= algorithm
    );
    return json_build_object(
        'params',params,
        'valid',pass
    );
  end;
```

Usage

```typescript
const { generateToken,verifyToken } = common
// Generate token
const token = generateToken(payload,expires_in,supabaseClient)
// Verify token
const { params,valid } = verifyToken(token,supabaseClient)
```

#### Password

```typescript
const { password_hash, password_verify } = common
// Hash password
const hashedPassword = password_hash(password)
// Verify password
const isPasswordCorret = password_verify(params.login_password, adminInfo.login_hash)
```



