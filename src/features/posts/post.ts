export class PostModel{

    id: number;
    title: string;
    image: string;
    description: string;
    authorName: string;
    date: string;
    likes: number;
    usersLikes: number[];


    constructor(title: string, authorName: string, image: string, description: string) {
        
        this.id = 0;
        this.title = title;
        this.image = image;
        this.authorName = authorName;
        this.description = description;
        this.date = new Date().toUTCString();
        this.likes = 0;
        this.usersLikes = [];
        
    }

    public userLiked(userId: number){
        
        const index = this.usersLikes.indexOf(userId);

        if (index > -1) {
            this.usersLikes.splice(index, 1);
            this.likes--;
        } else{
            this.usersLikes.push(userId);
            this.likes++;
        }
    }

}