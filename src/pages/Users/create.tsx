import React, {useState} from 'react';
import Button from "../../components/UI/Button/button";
import Input from "../../components/UI/Input/input";
import {useNavigate} from "react-router";
import usersPost from "../../apis/reqres/users.post";

const Create = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const navigation = useNavigate();

    const createNewUser = async () => {
        const data = {
            firstName, lastName, email
        }
        const req = await usersPost(data);
        alert(`User created with ID #${req.id}, at ${req.createdAt}`)

        navigation('/')
    }

    return (
        <div style={{padding: 20}}>
            <div style={{display: 'flex', flexDirection: "column", gap: 20, paddingBottom: 30}}>
                <Input title={"First name"}
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                       type={"text"}/>
                <Input title={"Last name"}
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                       type={"text"}/>
                <Input title={"Email"}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       type={"email"}/>
            </div>
            <div style={{display: "flex", gap: 20, alignItems: "center"}}>
                <Button cb={createNewUser} type="secondary">
                    Send
                </Button>
                <Button cb={() => navigation('/')} type="primary">
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default Create;
