import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState({ title: "", description: "" });
  const [items, setItems] = useState([
    {
      title: "",
      description: "",
      _id: "",
    },
  ]);
  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      .catch((err) => console.log(err));
  }, [items]);

  function handleChange(event) {
    const { name, value } = event.target;
    // todo console.log(event.target);
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };

    axios.post("/newitem", newItem);
    console.log(newItem);
    alert("item added");

    setItem({
      title: "",
      description: "",
    });
  }

  function deleteItem(id) {
    axios.delete("/delete/" + id);
    alert("item deleted");
    console.log(`Deleted item with id ${id}`);
  }

  const [isPut, setIsPut] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put("/put/" + id, updatedItem);
    alert("item updated");
    console.log(`item with id ${id} updated`);
  }

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log("updated");
  }

  return (
    <div className="App">
      {!isPut ? (
        <div className="main">
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={item.title}
            placeholder="title"
          />
          <input
            onChange={handleChange}
            type="text"
            name="description"
            value={item.description}
            placeholder="description"
          />
          <button id="addBtn" onClick={addItem}>
            ADD ITEM
          </button>
          {items.map((item) => {
            return (
              <div className="itemList" key={item._id}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <button
                  className="deleteBtn"
                  onClick={() => deleteItem(item._id)}
                >
                  DELETE
                </button>
                <button
                  className="updateBtn"
                  onClick={() => openUpdate(item._id)}
                >
                  UPDATE
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="main">
          <input
            onChange={handleUpdate}
            type="text"
            name="title"
            value={updatedItem.title}
            placeholder="title"
          />
          <input
            onChange={handleUpdate}
            type="text"
            name="description"
            value={updatedItem.description}
            placeholder="description"
          />
          <button id="updateItemBtn" onClick={() => updateItem(updatedItem.id)}>
            UPDATE ITEM
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
