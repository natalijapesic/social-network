import { PostModel } from "../../../models";

export type PostState = {
    posts: PostModel[],
    status: string,
    error: string | undefined,
}

export type LikeModel = {
    likedPost: PostModel,
    userId: number
}

export type PageRequest = {
    page: number,
    limit: number,
}