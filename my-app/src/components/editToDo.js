import { useState } from "react";
const EditToDo = ({ item, removeTask }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(item.title);
  const token = localStorage.getItem("token");

  const editHandler = (id) => {
    console.log(text);

    try {
      const editPost = async () => {
        const response = await fetch(
          `https://todo-redev.herokuapp.com/api/todos/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: text }),
          }
        );

        const editData = await response.json();
        if (!response.ok) {
          throw new Error(editData.message);
        }
        console.log(editData);
      };
      editPost();
      setIsEdit(!isEdit);
    } catch (error) {}
  };
  const toggleHandler = () => {
    setIsEdit(!isEdit);
  };
  return (
    <>
      {isEdit ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={() => removeTask(item.id)}>delete</button>
          <button onClick={() => editHandler(item.id)}>edit</button>
        </>
      ) : (
        <p>
          {item.title}
          <button onClick={() => removeTask(item.id)}>удалить</button>
          <button onClick={() => toggleHandler(item.id)}>изменитb</button>
        </p>
      )}
    </>
  );
};

export default EditToDo;
