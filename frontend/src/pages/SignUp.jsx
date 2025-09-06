import Container from '../components/Container';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [firstName,setFirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    return (
        <Container>
            <Heading label="Sign Up" />
            <SubHeading label="Enter your information to create an account" />
            
            <InputBox onChange={e =>{
                setFirstName(e.target.value);
            }} label="First Name" placeholder="John" />

            <InputBox onChange={e =>{
                setlastName(e.target.value);
            }} label="Last Name" placeholder="Doe" />
            
            <InputBox onChange={e =>{
                setUsername(e.target.value);
            }} label="Email" placeholder="johndoe@example.com" type="email"/>
            
            <InputBox onChange={e =>{
                setPassword(e.target.value);
            }} label="Password" placeholder="" type="password"/>

            <Button  label="Sign Up" onClick={async () => {
                const response=await axios.post("http://localhost:8081/api/v1/user/signup",{
                    username,
                    firstName,
                    lastName,
                    password
                });
               
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard")
            }} />
            <BottomWarning label="Already have an account?" buttonText="Login" to="/signin" />

            {/* Rest of the form will go here */}
        </Container>
    );
};

export default SignUp;