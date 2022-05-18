import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
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
        <div className="flex justify-center text-center pt-20">
        <section className="flex-col content-center pt-20">
                <h2 className="mb-2 text-xl text-white font-mono">Create new post</h2>
                <Input inputStyle="rounded" value={title} onChange={setTitle} placeholder="Input post title" type="text" />
                <Textarea textareaStyle="basic" onChange={setDescription} value={description} placeholder="What's on your mind.."/>
                <Input inputStyle="rounded" value={image} onChange={setImage} placeholder="Input image url" type="url" />

                <Button buttonStyle="light" type="button" message="Save Post" disabled={false} onClick={onSave} />
            </section>
        </div>
        
    );
}
export default CreatePost;
