import { useState } from "react";
const AddToDo = () => {
  const [title, setTitle] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit"> добавить</button>
      </form>
    </>
  );
};
export default AddToDo;
