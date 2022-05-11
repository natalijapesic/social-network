import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PostModel } from "./post";


const AddNewPost = () => {
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [authorName, setUserAuthorName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // const users = useAppSelector()
    // const onContentChanged = e => setContent(e.target.value)
    // const onAuthorChanged = e => setUserId(e.target.value)


    // const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    // const onSavePostClicked = () => {
    //     if (canSave) {
    //         try {
    //             setAddRequestStatus('pending')
    //             dispatch(addNewPost({ title, body: content, userId })).unwrap()

    //             setTitle('')
    //             setContent('')
    //             setUserId('')
    //         } catch (err) {
    //             console.error('Failed to save the post', err)
    //         } finally {
    //             setAddRequestStatus('idle')
    //         }
    //     }

    // }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        // const request = {
        //     email,
        //     password
        // }
        // signin(request);
   }

    // const usersOptions = users.map(user => (
    //     <option key={user.id} value={user.id}>
    //         {user.name}
    //     </option>
    // ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form onSubmit={onSubmit}>
                <label>Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                    placeholder="Input post title"
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={description}
                    onChange = {(e) => setDescription(e.target.value)}
                />
                <button>Save Post</button>
            </form>
        </section>
    )
}
export default AddNewPost
