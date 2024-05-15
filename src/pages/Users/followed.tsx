import React, {useEffect, useState} from 'react';
import Table from "../../components/UI/Table/table";
import Button from "../../components/UI/Button/button";
import Pagination from "../../components/Pagination/pagination";
import {useNavigate} from "react-router";
import {IUser} from "../../interfaces/IUser";
import {FOLLOWED_USERS} from "../../constants";

const Followed = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [paginatedList, setPaginatedList] = useState<IUser[]>([])

    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [perPage] = useState<number>(6);

    const navigate = useNavigate();

    useEffect(() => {
        const userData = window.localStorage.getItem(FOLLOWED_USERS)
        const users = JSON.parse(userData || '[]') as IUser[];
        setUsers(users)
    }, []);

    useEffect(() => {
        setTotalItems(users.length)
        paginate(curPage)
    }, [users]);

    const paginate = (page: number) => {
        const start =  (page - 1) * perPage
        const end = start + perPage;
        const slice = users.slice(start, end);
        setPaginatedList(slice)
        setCurPage(page)
    }

    return (
        <div>
            <Table headings={['ID', 'Avatar', 'First name', 'Last name', 'Email', 'Actions']}>
                {paginatedList.map((user) => (
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

export default Followed;
