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
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Item Management</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              className="bg-white bg-opacity-20 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            />
            <input
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="bg-white bg-opacity-20 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            />
            <input
              name="price"
              type="number"
              value={newItem.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
              className="bg-white bg-opacity-20 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            />
            <input
              name="tax"
              type="number"
              value={newItem.tax}
              onChange={handleInputChange}
              placeholder="Tax"
              className="bg-white bg-opacity-20 rounded-lg px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-white text-primary font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300"
          >
            <span className="text-primary">Add Item</span>
          </button>
        </form>
        <h2 className="text-2xl font-semibold mb-4">Items:</h2>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white bg-opacity-20 rounded-lg px-4 py-2 transition duration-300 hover:bg-opacity-30"
            >
              <span className="font-semibold">{item.name}</span> - ${item.price}{' '}
              <span className="text-sm">(Tax: ${item.tax})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
