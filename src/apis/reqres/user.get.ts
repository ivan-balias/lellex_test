import ReqRes from './instance'
import {IUser} from "../../interfaces/IUser";



const UserGet = async (id: number): Promise<IUser> => {
    const req = await ReqRes.get(`/api/users/${id}`)
    const res = await req.data;
    return res.data;
}

export default UserGet;
