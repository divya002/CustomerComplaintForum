export class User {
    mobile: string;
    email: string;
    password: string;
    type: string;
    
    constructor() {
        this.mobile = "";
        this.email = "";
        this.password = "";
        this.type = "Customer";
    }
}
