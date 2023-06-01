import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const exportFormHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();

      if (!data.token) {
        throw new Error(data.message);
      } else {
        localStorage.setItem("token", data.token);
        navigate("/todo");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setClearInputHanler = () => {
    // setEmail("");
    // setPassword("");
  };

  return (
    <>
      <form onSubmit={(e) => exportFormHandler(e)}>
        <input onChange={(e) => setEmail(e.target.value)} type="email" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        <button type="submit" onClick={setClearInputHanler}>
          войти
        </button>
      </form>
    </>
  );
};

export default Login;
