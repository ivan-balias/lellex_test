import ReqRes from './instance'
import {IUsersGetRes} from "../../interfaces/IUser";

const usersGet = async (page : number, perPage: number = 6) => {
    const req = await ReqRes.get<IUsersGetRes>('/api/users', {
        params: {
            page: page,
            per_page: perPage
        }
    })
    return req.data;
}

export default usersGet;
