import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import AllTasksTable from "../components/AllTasksTable";

interface Task {
  _id: string;
  name: string;
  description: string;
  dateStarted: string;
  dateFinished: string;
  status: boolean;
}

function HistoyView() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/${user._id}/tasks`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-zinc-200 grid grid-cols-12">
        <div className="hidden lg:inline-block col-span-3">
          <SideBar />
        </div>
        <div className="w-full p-10 col-span-12 lg:col-span-9 space-y-5">
          <h1 className="text-4xl font-semibold">History</h1>
          <h1 className="text-xl mt-3">
            Here you can see all your extra hour tasks worked
          </h1>
          <AllTasksTable tasks={tasks} />
        </div>
      </div>
    </>
  );
}

export default HistoyView;
