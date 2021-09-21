class Auth{
    constructor(username, password){
        this.authenticated = false;
        this.username = username;
        this.password = password;
    }

    login(callbk){
        console.log(this.username)
        this.authenticated = true;
        callbk();
    }

    logout(callbk){
        this.authenticated = false;
        callbk();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();
