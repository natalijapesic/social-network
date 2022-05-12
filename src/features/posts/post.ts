export class PostModel{

    id: number;
    title: string;
    image: string;
    description: string;
    authorName: string;
    date: string;
    likes: number;
    usersLike: number[]


    constructor(title: string, authorName: string, image: string, description: string) {
        
        this.id = 0;
        this.title = title;
        this.image = image;
        this.authorName = authorName;
        this.description = description;
        this.date = new Date().toUTCString();
        this.likes = 0;
        this.usersLike = [];
        
    }

    public userLiked(userId: number){
        
        const index = this.usersLike.indexOf(userId, 0);
        console.log(index);

        if (index > -1) {
            this.usersLike.splice(index, 1);
            this.likes -=1;
        } else{
            this.usersLike.push(userId);
            this.likes +=1;
        }
    }

}