import { Middleware } from '@reduxjs/toolkit';
import { UserModel } from '../features/auth/user';

interface PayloadType{
    user: UserModel,
    accessToken: string,
}

interface Response{

    payload: PayloadType
    type: string
}

const storeUser: Middleware = store => next => action =>
{
    let result: Response = next(action);

    if(result.type === "user/signUpUser/fulfilled" || result.type === "user/signInUser/fulfilled"){
        localStorage.setItem("accessToken", JSON.stringify(result.payload.accessToken));
        localStorage.setItem("user", JSON.stringify(result.payload.user));
    }
    
}

export default storeUser;