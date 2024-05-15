import {FOLLOWED_USERS} from "../constants";
import {IFollowedUser} from "../interfaces/IUser";
import UserGet from "../apis/reqres/user.get";
import {hashObject} from "./hashObject";

export const checkFollowedUsers = async (cb: (message:string) => void) => {
    const storedUsers = window.localStorage.getItem(FOLLOWED_USERS);
    const users = JSON.parse(storedUsers || '[]') as IFollowedUser[];
    for(const user of users) {
        const getUser = await UserGet(user.id);
        const hashUser =  await hashObject(getUser);
        if(user.hash !== hashUser){
            for( const prop in getUser) {
                // @ts-ignore
                if(user[prop] !== getUser[prop])
                {
                    cb(`User with ID #${getUser.id} changed ${prop}!`)
                }
            }
        }
    }
}
