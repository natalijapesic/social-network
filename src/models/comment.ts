export class CommentModel {
  id: number;
  description: string;
  authorName: string;
  authorId: number;
  postId: number;
  date: string;

  constructor(
    description: string,
    authorName: string,
    authorId: number,
    postId: number
  ) {
    this.id = 0;
    this.description = description;
    this.authorName = authorName;
    this.authorId = authorId;
    this.postId = postId;
    this.date = new Date().toUTCString();
  }
}
