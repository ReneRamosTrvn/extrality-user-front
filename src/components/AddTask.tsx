import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ChangeEvent } from "react";

function AddTask() {
  const user = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearData = () => {
    setFormData({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
  };

  const sendNewTask = async () => {
    const body = {
      owner: user._id,
      name: formData.input1,
      description: formData.input2,
      dateStarted: formData.input3,
      dateFinished: formData.input4,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/${user._id}/tasks`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      clearData();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <p className="text-left text-2xl font-medium">
        Add a task where you worked extra hours.
      </p>
      <div className="bg-white text-center rounded-lg p-5">
        <form className="grid grid-cols-1 lg:grid-cols-8 space-y-2 lg:space-y-0 lg:space-x-2">
          <input
            placeholder="TASK-111"
            className="bg-zinc-200 rounded-lg px-3"
            type="text"
            name="input1"
            value={formData.input1}
            onChange={handleInputChange}
          />
          <input
            placeholder="Added Pinia to Vue project..."
            className="bg-zinc-200 rounded-lg px-3 col-span-2"
            type="text"
            name="input2"
            value={formData.input2}
            onChange={handleInputChange}
          />
          <input
            className="bg-zinc-200 rounded-lg px-3 col-span-2"
            type="datetime-local"
            name="input3"
            value={formData.input3}
            onChange={handleInputChange}
          />
          <input
            className="bg-zinc-200 rounded-lg px-3 col-span-2"
            type="datetime-local"
            name="input4"
            value={formData.input4}
            onChange={handleInputChange}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              sendNewTask();
            }}
            className="bg-green-500 hover:bg-green-600 text-zinc-100 px-3 py-1 rounded-lg flex items-center justify-center"
            type="submit"
          >
            <FaPlus />
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTask;
