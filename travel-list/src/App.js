import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  const handleDeleteItem = (id) => {
    const newItemsList = items.filter((i) => i.id !== id);
    setItems(newItemsList);
  };

  const handleCheckItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClear = () => {
    setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckItem}
        onClearList={handleClear}
      />
      <Stats items={items} />
    </div>
  );
}

const Logo = () => {
  return <h1>Far Away </h1>;
};

const Form = ({ setItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(),
        description: description,
        quantity: quantity,
        packed: false,
      },
    ]);
    setDescription("");
    setQuantity(1);
  };
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
};

const PackingList = ({ items, onDeleteItem, onCheckItem, onClearList }) => {
  const [sort, setSort] = useState("input");
  return (
    <div className="list">
      <ul>
        {sorteItems(items, sort).map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
          />
        ))}
      </ul>
      <Sort onSort={setSort} sort={sort} />
      <button onClick={(e) => onClearList()}>Clear List</button>
    </div>
  );
};

const sorteItems = (items, sort) => {
  switch (sort) {
    case "description":
      return items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
    case "packed":
      return items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
    default:
      return items;
  }
};

const Sort = ({ onSort, sort }) => {
  return (
    <div className="actions">
      <select onChange={(e) => onSort(e.target.value)} value={sort}>
        <option value="input">By Input</option>
        <option value="description">Sort By Descriptio</option>
        <option value="packed">Sort by Packed status</option>
      </select>
    </div>
  );
};

const Item = ({ item, onDeleteItem, onCheckItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onCheckItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  let total = items.length;
  let packed = items.filter((i) => i.packed).length;
  return (
    <footer className="stats">
      <em>
        You have {total} items on your list, and you already packed {packed}(
        {Math.round((packed / total) * 100)} %)
      </em>
    </footer>
  );
};
