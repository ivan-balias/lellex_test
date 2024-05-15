import ReqReq from './instance'


type CreateUser = {
    firstName: string,
    lastName: string,
    email: string
}
const usersPost =  async (data: CreateUser): Promise<{id: string, createdAt: Date}> => {
    const req = await ReqReq.post('/api/users')
    return req.data;
}

export default usersPost;
