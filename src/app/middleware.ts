import { Middleware } from '@reduxjs/toolkit';
import { UserModel } from '../features/auth/user';
import storeService from '../storeService';

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

    switch (result.type) {

        case "user/signInUser/fulfilled":
            storeService.setAccessToken(result.payload.accessToken);
            storeService.setUser(result.payload.user.isAdmin);
            break;
        case "user/signUpUser/fulfilled":
            storeService.setAccessToken(result.payload.accessToken);
            storeService.setUser(result.payload.user.isAdmin);
            break;
        case "user/signOut":
            storeService.signOut();
            break;
    }
    
}

export default storeUser;