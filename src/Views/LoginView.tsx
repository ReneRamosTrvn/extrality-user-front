import { useDispatch } from "react-redux";
import { setUser } from "../state/auth/authSlice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChangeEvent } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userEmail = event.target.email.value;
    const userPassword = event.target.password.value;

    const body = {
      email: userEmail,
      password: userPassword,
    };

    if (userEmail && userPassword) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          dispatch(
            setUser({
              name: response.data.name,
              email: response.data.email,
              _id: response.data._id,
            })
          );
          navigate("home");
        })
        .catch((error) => {
          if (error.response.data.message == "User not found") {
            toast("User not found");
          }
          if (error.response.status == "401") {
            toast("Wrong password");
          }
        });
    } else {
      if (!userEmail) {
        toast("Enter a valid email");
      }
      if (!userPassword) {
        toast("Enter a valid password");
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center min-h-screen bg-[url('../assets/BG-image.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
        <form
          onSubmit={handleLogin}
          className="border p-8 rounded-lg shadow-lg max-w-[400px]"
        >
          <h1 className="text-4xl text-white mb-5">Login</h1>
          <input
            type="email"
            name="email" // Add name attribute for accessing input value
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
          <Link to="register">
            <p className="text-white">
              Dont have an accout? <span className="underline">Register</span>
            </p>
          </Link>
          <div className="text-white space-y-3 mt-5">
            <p className="font-medium">
              Since this is just a portafolio project I don't feel like
              collecting any type of personal data from you guys, thats why you
              are not going to be able to register a new user but use this one:
            </p>
            <p className="font-semibold">Email: employee@company.com</p>
            <p className="font-semibold">Password: eployee</p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
