import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0, tax: 0 });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:8000/items');
    setItems(response.data);
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/items', newItem);
    setNewItem({ name: '', description: '', price: 0, tax: 0 });
    fetchItems();
  };

  return (
    <div>
      <h1>Item Management</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={newItem.name} onChange={handleInputChange} placeholder="Name" required />
        <input name="description" value={newItem.description} onChange={handleInputChange} placeholder="Description" />
        <input name="price" type="number" value={newItem.price} onChange={handleInputChange} placeholder="Price" required />
        <input name="tax" type="number" value={newItem.tax} onChange={handleInputChange} placeholder="Tax" />
        <button type="submit">Add Item</button>
      </form>
      <h2>Items:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} (Tax: ${item.tax})
          </li>
        ))}
      </ul>
    </div>
  );
}
