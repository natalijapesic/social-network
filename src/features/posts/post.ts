export class PostModel{

    id: number;
    title: string;
    image: string;
    description: string;
    authorId: number;
    date: string;


    constructor(id: number, title: string, authorId: number, image: string, description: string) {
        
        this.id = id;
        this.title = title;
        this.image = image;
        this.authorId = authorId;
        this.description = description;
        this.date = new Date().toUTCString();
    }
}