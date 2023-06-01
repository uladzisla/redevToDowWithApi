import { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
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
  const editHandler = () => {};
  return (
    <>
      {tasks ? (
        tasks.map((item) => {
          return (
            <div key={item.id}>
              <p>
                {item.title}
                <button onClick={() => removeTask(item.id)}>удалить</button>
                <button onClick={() => editHandler(item.id)}>изменит</button>
              </p>
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
