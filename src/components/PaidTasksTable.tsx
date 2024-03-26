interface Task {
  _id: string;
  name: string;
  description: string;
  dateStarted: string;
  dateFinished: string;
  status: boolean;
}

function PaidTasksTable({ tasks }) {
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
  return (
    <>
      <p className="text-left text-2xl font-medium">Paid tasks.</p>
      <div className="overflow-auto bg-white rounded-lg ">
        {tasks && tasks.filter((task) => task.status).length > 0 ? (
          <table className="w-full table-auto overflow-scroll">
            <thead className="h-10">
              <tr className="bg-indigo-800 text-white">
                <th className="rounded-tl-lg px-3">ID</th>
                <th className="px-3">Decription</th>
                <th className="px-3">Date Started</th>
                <th className="px-3">Date Finished</th>
                <th className=" rounded-tr-lg px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-center">
              {tasks !== null &&
                tasks
                  .filter((task) => task.status)
                  .map((task: Task) => (
                    <tr
                      key={task._id}
                      className="h-20 divide-slate-300  hover:bg-zinc-100"
                    >
                      <td>{task.name}</td>
                      <td>{task.description}</td>
                      <td>{formatDate(task.dateStarted)}</td>
                      <td>{formatDate(task.dateFinished)}</td>
                      {!task.status && (
                        <td className="text-orange-500">Pending</td>
                      )}
                      {task.status && <td className="text-green-500">Paid</td>}
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full flex justify-center items-center p-5">
            <p>
              You have not paid tasks yet. Wait for the admin to aprove and pay
              them.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default PaidTasksTable;
