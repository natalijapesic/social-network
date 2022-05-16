import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostModel } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getAuthUser } from "../../auth/authenticationSlice";
import { addPost } from "../postSlice";



const CreatePost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const user = useAppSelector(getAuthUser); 


    const onSave = () => {
        if(user != null){
            const request = new PostModel(title, user.username, image, description, user.id);
            
            dispatch(addPost(request));
            navigate("/");
        }
   }

    return (
        <section className="flex-col content-center pt-20">
            <h2 className="flex">Create new post</h2>
                <input
                    className="flex"
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder="Input post title"
                />
                <textarea
                    className="flex"
                    id="postContent"
                    name="postContent"
                    value={description}
                    onChange = {(e) => setDescription(e.target.value)}
                />
                <input 
                    className="flex"
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
export default CreatePost
