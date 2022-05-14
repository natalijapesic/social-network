import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Comment from './CommentComponent';
import { fetchComments, getCommentsError, getCommentsStatus, selectAllComments } from "./commentSlice";

const CommentList: React.FC = () => {
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
        content = comments.map((comment, index) => <Comment key={index} {...comment} />)
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