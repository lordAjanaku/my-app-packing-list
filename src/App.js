import { useState } from "react";
import { Trash2, Plus, Package } from "lucide-react";
import "./index.css";

const itemsArray = [
  { id: crypto.randomUUID(), name: "passport", quantity: 1, isPacked: false },
  { id: crypto.randomUUID(), name: "t-shirt", quantity: 3, isPacked: false },
  { id: crypto.randomUUID(), name: "toothbrush", quantity: 1, isPacked: false },
  { id: crypto.randomUUID(), name: "sunglasses", quantity: 2, isPacked: false },
  { id: crypto.randomUUID(), name: "phone charger", quantity: 1, isPacked: false },
];

function App() {
  const [items, setItems] = useState(itemsArray);

  return (
    <div className="container">
      <div className="card">
        <Header />
        <StatusBar />
        <Form items={items} setItems={setItems} />
        <ListItems items={items} setItems={setItems} />
        <button className="clear-button">Clear All</button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">Packing List</h1>
        <Package color="#ffffff" size={28} />
      </div>

      <p className="subtitle">Ready for your trip?</p>
      <ProgressCircle />
    </header>
  );
}

function ProgressCircle() {
  return (
    <div className="progress-circle">
      <svg className="progress-svg" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="4" fill="none" />
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="#8b5cf6"
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${2 * Math.PI * 24}`}
          strokeDashoffset={`${2 * Math.PI * 24 * 0.4}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="progress-text">60%</span>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="stats-bar">
      <span className="stats-left">
        <span className="stats-bold">3</span>
        <span className="stats-gray">/5</span>
      </span>
      <span className="stats-right">In progress</span>
    </div>
  );
}

function ListItems({ items, setItems }) {
  function handleToggle(itemId) {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
    );
    setItems(newItems);
  }

  function handleDeleteItem(itemId) {
    setItems(items.filter((item) => item.id !== itemId));
  }

  return (
    <>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          quantity={item.quantity}
          isPacked={item.isPacked}
          handleToggle={handleToggle}
          handleDeleteItem={handleDeleteItem}
        />
      ))}
    </>
  );
}

function Item({ id, name, quantity, isPacked, handleToggle, handleDeleteItem }) {
  return (
    <div className={`item ${isPacked ? "item-packed" : "item-unpacked"}`}>
      <label className="item-label">
        <div
          className={`checkbox-wrapper ${
            isPacked ? "checkbox-checked" : "checkbox-unchecked"
          }`}
        >
          <input
            type="checkbox"
            checked={isPacked}
            className="checkbox-input"
            onChange={() => handleToggle(id)}
          />
          <span className="checkbox-custom"></span>
        </div>

        <div className="item-content">
          <span
            className={`item-name ${
              isPacked ? "item-name-packed" : "item-name-unpacked"
            }`}
          >
            {name}
          </span>
        </div>

        <span className={`badge ${isPacked ? "badge-packed" : "badge-unpacked"}`}>
          ×{quantity}
        </span>
      </label>

      <button className="delete-button" onClick={() => handleDeleteItem(id)}>
        <Trash2 size={18} color="#f87171" />
      </button>
    </div>
  );
}

function Form({ items, setItems }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleSubmit(e) {
    e.preventDefault();
      
    if (!itemName) return;

    const newItem = {
      id: crypto.randomUUID(),
      name: itemName,
      quantity,
      isPacked: false,
    };

    handleAddItem(newItem);
    setItemName("");
    setQuantity(1);
  }

  return (
    <form className="input-section" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          placeholder="Add item..."
          className="text-input"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <input
          type="number"
          value={quantity}
          min="1"
          className="number-input"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <button className="add-button" type="submit">
        <Plus size={20} strokeWidth={3} />
        Add Item
      </button>
    </form>
  );
}

export default App;