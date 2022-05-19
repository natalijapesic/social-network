import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { getAuthUser } from "../../auth/authenticationSlice";
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from "../postSlice";
import Post from './Post'


const Posts: React.FC = () => {
    const dispatch = useAppDispatch();

    let posts = useAppSelector(selectAllPosts);
    let postStatus = useAppSelector(getPostsStatus);
    let error = useAppSelector(getPostsError);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrev, setDisablePrev] = useState(false);



    useEffect(() => {
        if (postStatus === 'idle' || postStatus === 'succeeded') {
            dispatch(fetchPosts({ page, limit }));
        }
    }, [page, limit, dispatch])


    const nextPage = () =>{

        if (posts.length === 0)
            setDisableNext(true);
        else{
            setDisablePrev(false);
            setPage(page + 1);
        }

    }

    const prevPage = () =>{
        if(page > 1){
            setDisableNext(false);
            setPage(page - 1);
        }else{
            setDisablePrev(true);
        }
    }

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        content = posts.map((post, index) => <Post key={index} {...post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }
    

    return (
        <div className="flex-col content-center">
            <div className="flex justify-center">
                <label className="mt-2" htmlFor="pageLimit">Choose a page limit:</label>
                <select
                    className="flex bg-gray-800 px-5 ml-2 focus:cyan-500"
                    name="pageLimit"
                    id="pageLimit"
                    onChange={(e) => setLimit(parseInt(e.target.value))}>
                    
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>

                </select>
            </div>

            <div className="flex flex-wrap justify-around">
                {content}
            </div>
            <div className="flex justify-around">
                <Button onClick={prevPage} buttonStyle="prev" type="button" value="prev" message="prev" disabled={disablePrev} />
                <Button onClick={nextPage} buttonStyle="next" type="button" value="next" message="next" disabled={disableNext} />
            </div>

        </div>

    );
};
export default Posts;