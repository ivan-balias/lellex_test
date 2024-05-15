import {IPagination} from "./IPagination";

export interface IUsersGetRes extends IPagination{
    data: IUser[]
}

export type IUser = {
    id: number,
    avatar: string,
    first_name: string,
    last_name: string,
    email: string
}

export type IFollowedUser = {
    hash: string
} & IUser
