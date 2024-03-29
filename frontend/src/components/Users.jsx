import { useState, useEffect } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        await axios.get("http://localhost:3000/api/v1/user/bulk")
        .then((response) => {
            setUsers(response.data.user);
        });

    }, [])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={(e) => {
                axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${e.target.value}`)
                .then((response) => {
                    setUsers(response.data.user);
                })
            }}></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center my-2 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <Button label={"Send Money"} onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname);
            }}/>
        </div>
    </div>
}