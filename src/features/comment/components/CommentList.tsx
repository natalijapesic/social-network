import { useEffect } from "react";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchComments, getCommentsError, getCommentsStatus, selectAllComments } from "../commentSlice";
import Comment from "./Comment";

interface IProps{
    postId: number;
}

const CommentList: React.FC<IProps> = (props: IProps) => {
    const dispatch = useAppDispatch();

    const comments = useAppSelector(selectAllComments);
    const commentsStatus = useAppSelector(getCommentsStatus);
    const error = useAppSelector(getCommentsError);

    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    useEffect(() => {
        if (commentsStatus === 'idle') {
            dispatch(fetchComments())
        }
    }, [commentsStatus, dispatch])

    let content;

    if (commentsStatus === 'succeeded') {
        content = comments.filter((comment) => comment.postId === props.postId)
                          .map((comment, index) => <Comment key={index} {...comment} />)
    } else if (commentsStatus === 'failed') {
        content = <p>{error}</p>;
    } else if (commentsStatus === 'loading') {
        content = <Spinner type="gray" />
    }
    
    return (
        <section className="flex-row items-center">
            {content}
        </section>
    )
}
export default CommentList;

