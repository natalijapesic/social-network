import { Middleware } from '@reduxjs/toolkit';
import { UserModel } from '../features/auth/user';
import storeService from '../storeService'

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
        storeService.setAccessToken(result.payload.accessToken);
        
        const user = result.payload.user;
        storeService.setUserCredentials(user.email, user.password);
    }
    
}

export default storeUser;