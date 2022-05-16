import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CommentModel } from "../../models/comment";
import { getAuthUser } from "../auth/authenticationSlice";
import { addComment } from "./commentSlice";

interface IProps{
    postId: number;
}

const CreateComment: React.FC<IProps> = (props: IProps) => {
    
    const dispatch = useAppDispatch();
    const user = useAppSelector(getAuthUser);

    const [description, setDescription] = useState('');

    const onComment = () => {
        if (user) {
            const request = new CommentModel(description, user.username, user.id, props.postId);
            dispatch(addComment(request));
        }
    };

    return (
        <div>
            <textarea
                id={props.postId.toString()}
                name="commentContent"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button value={props.postId} onClick={onComment}>Comment</button>
        </div>
    );
}

export default CreateComment;