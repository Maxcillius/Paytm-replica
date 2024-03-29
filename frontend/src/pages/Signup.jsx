import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const [username, setUser] = useState("");
    const [password, setPass] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Signup"}/>
                    <Subheading label={"Enter you information to create an account"}/>
                    <Inputbox placeholder={"John"} label={"First Name"} type={"text"} func={(e) => {
                        setFirstname(e.target.value);
                    }}></Inputbox>
                    <Inputbox placeholder={"Doe"} label={"Last Name"} type={"text"} func={(e) => {
                        setLastname(e.target.value);
                    }}></Inputbox>
                    <Inputbox placeholder={"example@email.com"} label={"Email"} type={"text"} func={(e) => {
                        setUser(e.target.value);
                    }}></Inputbox>
                    <Inputbox placeholder={"123456"} label={"Password"} type={"Password"} func={(e) => {
                        setPass(e.target.value);
                    }}></Inputbox>
                    <Button label={"Sign up"} onClick={ async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            password,
                            firstname,
                            lastname,
                        });

                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }}></Button>
                    <BottomWarning label={"Already have an account? "} to={"/signin"} buttonText={"Sign in"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}