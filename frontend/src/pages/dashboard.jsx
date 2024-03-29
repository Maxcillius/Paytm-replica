import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export function Dashboard() {

    const [value, setValue] = useState();

    useEffect(async () => {
       await axios.get("http://localhost:3000/v1/api/account/balance", {
        
       })
    })

    return (
        <div className="px-12 mt-5">
            <Appbar></Appbar>
            <Balance value={value}></Balance>
            <Users></Users>
        </div>
    )
}