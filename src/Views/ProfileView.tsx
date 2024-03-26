import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";

function ProfileView() {
  const user = useSelector((state) => state.auth);
  return (
    <>
      <div className="w-full min-h-screen bg-zinc-200 grid grid-cols-12">
        <div className="hidden lg:inline-block col-span-3">
          <SideBar />
        </div>
        <div className="w-full p-10 col-span-12 lg:col-span-9">
          <h1 className="text-4xl font-semibold">Your Profile</h1>
          <div className="grid grid-cols-2 bg-zinc-100 rounded-lg p-5 my-5">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileView;
