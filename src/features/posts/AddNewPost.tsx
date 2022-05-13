import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAuthUser } from "../auth/authenticationSlice";
import { PostModel } from "./post";
import { addNewPost } from "./postSlice";


const AddNewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const user = useAppSelector(getAuthUser); 


    const onSave = () => {
        if(user != null){
            const request = new PostModel(title, user.username, image, description, user.id);
            
            dispatch(addNewPost(request));
            navigate("/");
        }
   }

    return (
        <section>
            <h2>Add a New Post</h2>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder="Input post title"
                />
                <textarea
                    id="postContent"
                    name="postContent"
                    value={description}
                    onChange = {(e) => setDescription(e.target.value)}
                />
                <input 
                    type="text"
                    id="postImage"
                    name="postImage"
                    value={image}
                    onChange = {(e) => setImage(e.target.value)}
                    placeholder="Input image url"
                />
                <button onClick={onSave}>Save Post</button>
        </section>
    );
}
export default AddNewPost
