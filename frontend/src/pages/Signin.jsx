import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import axios from "axios";

export const Signin = () => {

    const [userName, setUser] = useState("");
    const [userPass, setPass] = useState("");

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <Subheading label={"Enter you information to sign in"}/>
                    <Inputbox placeholder={"example@email.com"} label={"Email"} type={"text"} func={(e) => {
                        setUser(e.target.value);
                    }}></Inputbox>
                    <Inputbox placeholder={"123456"} label={"Password"} type={"Password"} func={(e) => {
                        setPass(e.target.value);
                    }}></Inputbox>
                    <Button label={"Sign in"} onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username: userName,
                            password: userPass,
                        });
                       localStorage.setItem("token", response.data.token);
                    }}></Button>
                    <BottomWarning label={"Don't have an account? "} to={"/signup"} buttonText={"Sign up"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}