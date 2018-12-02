export class Complain {
    email:string;
    heading:string;
    description:string;
    datecreated:Date=new Date();
    dateupdated:Date=new Date();
    status:string;
    comment:object[]=new Array();
    constructor(){
        this.email="";
        this.heading="";
        this.description="";
        this.datecreated=new Date();
        this.dateupdated=null;
        this.status="Submitted";
        this.comment=[];  
    }
}
