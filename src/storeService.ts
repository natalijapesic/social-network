

interface UserCredentials{
    email:string,
    password:string,
}
class StoreService{

    setAccessToken(token: string){
        localStorage.setItem("accessToken", JSON.stringify(token));
    }

    setUserCredentials(email: string, password:string){
        localStorage.setItem("user", JSON.stringify({email, password}));
    }

    getAccessToken():string | null{
        return localStorage.getItem("accessToken");
    }

    getUserCredentials():UserCredentials | null{
        const dataFromStorage = localStorage.getItem("user");
        if(dataFromStorage)
            return JSON.parse(dataFromStorage);
        else 
            return null;
    }

    removeFromStorage(key: string){
        localStorage.removeItem(key);
    }
}

export default new StoreService();