import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[url('../assets/BG-image.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
        <div className="text-white border p-8 rounded-lg shadow-lg w-80 space-y-5">
          <p className="font-medium">
            Since this is just a portafolio project I don't feel like collecting
            any type of personal data from you guys, thats why you are not going
            to be able to register a new user but use this one:
          </p>
          <p className="font-semibold">Email: employee@company.com</p>
          <p className="font-semibold">Password: eployee</p>
          <div>
            <Link to="/">
              <p className="text-white">
                Already have an account?{" "}
                <span className="underline">Login</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
