import { UserModel } from "./models";


class StoreService{

    setAccessToken(token: string){
        localStorage.setItem("accessToken", JSON.stringify(token));
    }

    setUser(user: UserModel){
        localStorage.setItem("user", JSON.stringify(user));
    }

    getAccessToken():string | null{
        return localStorage.getItem("accessToken");
    }

    getUser():UserModel | null{
        const dataFromStorage = localStorage.getItem("user");
        if(dataFromStorage)
        {
            return JSON.parse(dataFromStorage);
        }
        else 
            return null;
    }

    removeFromStorage(key: string){
        localStorage.removeItem(key);
    }

    signOut() {
        this.removeFromStorage("accessToken");
        this.removeFromStorage("user");
    }
}

export default new StoreService();