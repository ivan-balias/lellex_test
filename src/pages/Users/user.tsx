import React, {useEffect, useState} from 'react';
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import {useLoaderData, useNavigate} from "react-router";
import UserGet from "../../apis/reqres/user.get";
import {IFollowedUser, IUser} from "../../interfaces/IUser";
import {hashObject} from "../../utils/hashObject";
import {FOLLOWED_USERS} from "../../constants";

type UserPageLoader = {
    user: IUser
}

const User = () => {
    const {user} = useLoaderData() as UserPageLoader;

    const [userId] = useState<number>(user.id);
    const [firstName] = useState<string>(user.first_name);
    const [lastName] = useState<string>(user.last_name);
    const [email] = useState<string>(user.email);

    const [isFollowed, setIsFollowed] = useState<boolean>(false)

    const navigation = useNavigate();

    const usersFromStorage = () => {
        const storedUsers = window.localStorage.getItem('followedUsers');
        return JSON.parse(storedUsers || '[]');
    }

    useEffect(() => {
        const users = usersFromStorage()
        const isNewUser = users.filter((u: IUser) => {
            return u.id === user.id
        })

        if (isNewUser.length)
            setIsFollowed(true)
    }, []);

    const followUser = async () => {
        const users = usersFromStorage();
        users.push(user);
        const hash: string = await hashObject(user)
        const userCopy: IFollowedUser = user as IFollowedUser;
        userCopy.hash = hash;
        const data = JSON.stringify(users);
        window.localStorage.setItem(FOLLOWED_USERS, data)
        navigation('/user/followed')
    }

    return (
        <div style={{padding: 20}}>
            <div style={{display: 'flex', flexDirection: "column", gap: 20, paddingBottom: 30}}>
                <Input title={"ID"}
                       value={userId}
                       type={"number"} disabled/>
                <Input title={"First name"}
                       value={firstName}
                       type={"text"} disabled/>
                <Input title={"Last name"}
                       value={lastName}
                       type={"text"} disabled/>
                <Input title={"Email"}
                       value={email}
                       type={"email"} disabled/>
            </div>
            <div style={{display: "flex", gap: 20, alignItems: "center"}}>
                {!isFollowed ? (
                    <Button cb={followUser} type="secondary">
                        Follow
                    </Button>
                ) : (<></>)}
                <Button cb={() => navigation(-1)} type="primary">
                    Back
                </Button>
            </div>
        </div>
    );
};

export const UserLoader = async ({params}: { params: any }) => {
    const user = await UserGet(params.id)
    return {user}
}

export default User;
