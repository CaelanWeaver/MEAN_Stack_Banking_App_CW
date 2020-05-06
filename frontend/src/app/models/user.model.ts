export interface UserResponse{

    user:User;

}

export interface User{

        email : string;
        username : string;
        password : string;
        creation_dt : Date;
        balance : number;
        _id : string;
    
}