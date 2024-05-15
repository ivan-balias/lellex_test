import {IUser} from "../../interfaces/IUser";
import UsersGet from "../../apis/reqres/users.get";
import {useLoaderData, useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import Table from "../../components/UI/Table/table";
import Button from "../../components/UI/Button/button";
import Pagination from "../../components/Pagination/pagination";
import {IPagination} from "../../interfaces/IPagination";


type UsersPageLoader = {
    users: IUser[],
    pagination: IPagination
}
const Users = () => {
    const {pagination, users: loadedUsers} = useLoaderData() as UsersPageLoader;
    const [users, setUsers] = useState<IUser[]>(loadedUsers);

    const [curPage, setCurPage] = useState<number>(pagination.page);
    const [totalItems, setTotalItems] = useState<number>(pagination.total);
    const [perPage, setPerPage] = useState<number>(pagination.per_page);

    const navigate = useNavigate();
    const getData = async () => {
        const {data, page, total, per_page} = await UsersGet(curPage);
        setCurPage(page)
        setTotalItems(total)
        setPerPage(per_page)
        setUsers(data)
    }

    const paginate = (page: number) => {
        setCurPage(page)
    }

    useEffect(() => {
        getData()
    }, [curPage]);

    return (
        <div>
            <div style={{padding: "10px 20px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Button cb={() => navigate('/user/new') } type="primary">
                    New User
                </Button>
            </div>

            <Table headings={['ID', 'Avatar', 'First name', 'Last name', 'Email', 'Actions']}>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>#{user.id}</td>
                        <td><img src={user.avatar} className="roundedFull" width={50} height={50} alt={"user avatar"}/></td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                            <div style={{display: 'flex', gap: 15, justifyContent: 'center', alignItems: "center"}}>
                                <Button type="primary" cb={() => navigate(`/user/${user.id}`)}>View</Button>
                                <Button type="secondary" cb={() => {
                                }}>Edit</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
            {users.length && (
                <Pagination current={curPage} total={totalItems} per_page={perPage} cb={paginate}/>
            )}
        </div>
    );
};

export const UsersLoader = async (): Promise<UsersPageLoader> => {
    const res = await UsersGet(1);
    const users = res.data;
    const pagination = {
        page: res.page,
        total: res.total,
        total_pages: res.total_pages,
        per_page: res.per_page
    }
    return {users, pagination}
}

export default Users;
