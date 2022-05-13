import { CommentModel } from "./comment";

interface CommentProps{

    date: string;
    authorName: string;
    description: string;

}
const Comment: React.FC<CommentProps> = (comment: CommentProps) => {

    return (
        <article className="flex-column border-l-4 m-6">
            <span>{comment.date}</span>
            <div>
            <p><span>{comment.authorName}:</span>{comment.description.substring(0, 100)}</p>
            </div>
        </article>
    );
}

export default Comment;