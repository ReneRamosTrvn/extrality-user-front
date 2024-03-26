import { useEffect, useState } from "react";
import axios from "axios";
import AddTask from "../components/AddTask";
import PendingTaskTable from "../components/PengingTaskTable";
import PaidTasksTable from "../components/PaidTasksTable";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";

interface Task {
  _id: string;
  name: string;
  description: string;
  dateStarted: string;
  dateFinished: string;
  status: boolean;
}

function HomePage() {
  const userId = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/user/${userId._id}/tasks`
      );
      console.log("History data fetched", tasks);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/user/${taskId}/tasks`
      );
      toast("Task deleted succesfully");
      fetchData();
    } catch (error) {
      toast("Error");
      console.error(error);
    }
  };

  const editTask = async (taskId: string, body: object) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/user/${taskId}/tasks`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast("Task edited succesfully");
      fetchData();
    } catch (error) {
      toast("Error");
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12 w-full">
        <div className="hidden lg:inline-block col-span-3">
          <SideBar />
        </div>
        <div className="col-span-12 lg:col-span-9 w-full bg-zinc-100 min-h-screen p-5 lg:p-10 space-y-5">
          <div className="">
            <h1 className="text-4xl font-semibold">Welcome {userId.name}.</h1>
          </div>
          <AddTask />
          <PendingTaskTable
            tasks={tasks}
            onDelete={deleteTask}
            onEdit={editTask}
          />
          <PaidTasksTable tasks={tasks} />
        </div>
        ;
      </div>
      <ToastContainer />
    </>
  );
}

export default HomePage;
