import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Comment from './Comment';
import { fetchComments, getCommentsError, getCommentsStatus, selectAllComments } from "./commentSlice";


interface IProps{
    postId: number;
}

const CommentList: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();

    const comments = useAppSelector(selectAllComments);
    const commentsStatus = useAppSelector(getCommentsStatus);
    const error = useAppSelector(getCommentsError);

    useEffect(() => {
        if (commentsStatus === 'idle') {
            dispatch(fetchComments())
        }
    }, [commentsStatus, dispatch])

    let content;
    if (commentsStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (commentsStatus === 'succeeded') {
        content = comments.filter((comment) => comment.postId === props.postId)
                          .map((comment, index) => <Comment key={index} {...comment} />)
    } else if (commentsStatus === 'failed') {
        content = <p>{error}</p>;
    }
    
    return (
        <section className="flex-row items-center">
            {content}
        </section>
    )
}
export default CommentList;