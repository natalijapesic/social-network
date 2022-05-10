export class PostModel{

    id: number;
    title: string;
    image: string;
    description: string;
    authorName: string;
    date: string;
    likes: number;


    constructor(title: string, authorName: string, image: string, description: string) {
        
        this.id = 0;
        this.title = title;
        this.image = image;
        this.authorName = authorName;
        this.description = description;
        this.date = new Date().toUTCString();
        this.likes = 0;
        
    }
}