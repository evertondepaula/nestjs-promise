import e from "express";

export default class User {
    
    public id:Number;
    public email:string;

    constructor(id:Number, email:string) {
        this.id = id;
        this.email = email;
    }
}