interface UserCredentials{
    email:string,
    password:string,
}

class StoreService{

    setAccessToken(token: string){
        localStorage.setItem("accessToken", JSON.stringify(token));
    }

    setUser(isAdmin: boolean){
        localStorage.setItem("user", JSON.stringify(isAdmin));
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

    signOut() {
        this.removeFromStorage("accessToken");
        this.removeFromStorage("user");
    }
}

export default new StoreService();