import { useEffect, useState } from "react";
import EditToDo from "./editToDo";

const Tasks = () => {
  const [tasks, setTasks] = useState(null);
  // const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const postData = async () => {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTasks(data);
      console.log(data);
    };
    postData();
  }, [token]);

  const removeTask = (id) => {
    const removeData = async () => {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataRemove = await response.json();
      console.log(dataRemove);
    };
    removeData();
  };

  return (
    <>
      {tasks ? (
        tasks.map((item) => {
          return (
            <div key={item.id}>
              <EditToDo item={item} removeTask={removeTask} />
            </div>
          );
        })
      ) : (
        <h1>...in progress</h1>
      )}
    </>
  );
};
export default Tasks;
