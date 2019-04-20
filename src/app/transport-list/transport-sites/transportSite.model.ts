export class TransportSite{
    public name: string;
    public desc: string;
    public link: string;
    public rating: string;
    public rangeFrom: string;
    public email: string;
    public phone: string;
    public imageLink: string;

    constructor(name: string, desc: string, link: string, rating: string, rangeFrom: string, email: string, phone: string, imageLink: string){
        this.name = name;
        this.desc = desc;
        this.link = link;
        this.rating = rating;
        this.rangeFrom = rangeFrom;
        this.email = email;
        this.phone = phone;
        this.imageLink = imageLink;
    }

}