export class Package{

   
   public title: String;
    public price: String;
    public desc: String;
    public cities: String;
    public departureCity: String;
     public departuteTime: String;
     public returnTime: String;
     public dressCode: String;
     public included: String;
    public notIncluded: String;
    public days: String;

    constructor(title:string,price:string,desc:string,cities:string,departureCity:string,departuteTime:string,returnTime:string,dressCode:string,included:string,notIncluded:string,days:string){
        this.title=title;
        this.price=price;
        this.desc=desc;
        this.cities=cities;
        this.departureCity=departureCity;
        this.departuteTime=departuteTime;
        this.returnTime=returnTime;
        this.dressCode=dressCode;
        this.included=included;
        this.notIncluded=notIncluded;
        this.days=days;


    }


}
