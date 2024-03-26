import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
interface Task {
  _id: string;
  name: string;
  description: string;
  dateStarted: string;
  dateFinished: string;
  status: boolean;
}

function PendingTaskTable({ tasks, onDelete, onEdit }) {
  const [editableTaskId, setEditableTaskId] = useState(null);
  const user = useSelector((state) => state.auth);

  const [formEditData, setFormEditData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setFormEditData({
      ...formEditData,
      [name]: value,
    });
  };

  const edit = (taskId) => {
    setEditableTaskId(taskId);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  }

  const editTask = (taskId: string) => {
    const updatedBody = {
      owner: user._id,
      ...(formEditData.input1 && { name: formEditData.input1 }),
      ...(formEditData.input2 && { description: formEditData.input2 }),
      ...(formEditData.input3 && { dateStarted: formEditData.input3 }),
      ...(formEditData.input4 && { dateFinished: formEditData.input4 }),
    };
    onEdit(taskId, updatedBody);
    clearData();
  };
  const deleteTask = (taskId: string) => {
    onDelete(taskId);
  };

  const clearData = () => {
    setFormEditData({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
    });
  };

  return (
    <>
      <p className="text-left text-2xl font-medium">Pending tasks</p>
      <div className="overflow-auto bg-white rounded-lg ">
        {tasks && tasks.filter((task: Task) => !task.status).length > 0 ? (
          <table className="w-full table-auto overflow-scroll">
            <thead className="h-10">
              <tr className="bg-indigo-800 text-white">
                <th className="rounded-tl-lg px-3">ID</th>
                <th className="px-3">Decription</th>
                <th className="px-3">Date Started</th>
                <th className="px-3">Date Finished</th>
                <th className="px-3">Status</th>
                <th className=" rounded-tr-lg px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-center">
              {tasks !== null &&
                tasks
                  .filter((task: Task) => !task.status)
                  .map((task: Task) => (
                    <tr
                      key={task._id}
                      className="h-20 divide-slate-300  hover:bg-zinc-100"
                    >
                      {editableTaskId === task._id ? (
                        <>
                          <td>
                            <input
                              className="text-center w-10"
                              type="text"
                              placeholder={task.name}
                              name="input1"
                              value={formEditData.input1}
                              onChange={handleEditInputChange}
                            />
                          </td>
                          <td>
                            <input
                              className="text-center w-20"
                              type="text"
                              placeholder={task.description}
                              name="input2"
                              value={formEditData.input2}
                              onChange={handleEditInputChange}
                            />
                          </td>
                          <td>
                            <input
                              className="text-center"
                              type="datetime-local"
                              placeholder={task.dateStarted}
                              name="input3"
                              value={formEditData.input3}
                              onChange={handleEditInputChange}
                            />
                          </td>
                          <td>
                            <input
                              className="text-center"
                              type="datetime-local"
                              placeholder={task.dateFinished}
                              name="input4"
                              value={formEditData.input4}
                              onChange={handleEditInputChange}
                            />
                          </td>
                          {!task.status && (
                            <td className="text-orange-500">Pending</td>
                          )}
                          {task.status && (
                            <td className="text-green-500">Paid</td>
                          )}
                          <td className="space-x-2">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                edit(null);
                                editTask(task._id);
                              }}
                              className="bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded-full text-white text-xs"
                            >
                              <FaSave />
                            </button>
                            <button
                              type="button"
                              onClick={() => edit(null)}
                              className="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-full text-white text-xs"
                            >
                              <IoClose />
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{task.name}</td>
                          <td className="text-wrap">{task.description}</td>
                          <td>{formatDate(task.dateStarted)}</td>
                          <td>{formatDate(task.dateFinished)}</td>
                          {!task.status && (
                            <td className="text-orange-500">Pending</td>
                          )}
                          {task.status && (
                            <td className="text-green-500">Paid</td>
                          )}
                          <td className="justify-between">
                            <button
                              onClick={() => edit(task._id)}
                              className="bg-zinc-400 px-3 py-1 rounded-full text-white text-xs"
                            >
                              <CiEdit />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTask(task._id)}
                              className="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-full text-white text-xs"
                            >
                              <IoClose />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full flex justify-center items-center p-5">
            <p>You have not tasks yet. Add them first to see them here.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default PendingTaskTable;
