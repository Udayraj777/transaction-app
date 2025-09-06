import Container from "../components/Container";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/user/signin",
        {
          username,
          password,
        }
      );
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
      alert("Error while logging in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Heading label="Sign In" />
      <SubHeading label="Enter your information to create an account" />

      <InputBox
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        label="Email"
        placeholder="your email"
        type="email"
      />

      <InputBox
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label="Password"
        placeholder=""
        type="password"
      />

      <Button label="Sign In" onClick={handleSignIn} />
      <BottomWarning
        label="don't have an account?"
        buttonText="SignUp"
        to="/signup"
      />
      {/* Rest of the form will go here */}
    </Container>
  );
};

export default SignIn;
