import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAuthUser } from "../auth/authenticationSlice";
import { CommentModel } from "./comment";
import { addComment } from "./commentSlice";

interface CreateCommentProps{
    postId:number;
}
const CreateComment: React.FC<CreateCommentProps> = (props: CreateCommentProps) =>{
    
    const dispatch = useAppDispatch();
    const user = useAppSelector(getAuthUser); 

    const [description, setDescription] = useState('');

    const onComment = () => {
        if(user != null){
            const request = new CommentModel(description, user.username, user.id, props.postId);
            
            dispatch(addComment(request));
        }
   }

    return(
        <div>
            <textarea
                id="commentContent"
                name="commentContent"
                value={description}
                onChange = {(e) => setDescription(e.target.value)}
            />
            <button onClick={onComment}>Comment</button>
        </div>
    );
}

export default CreateComment;