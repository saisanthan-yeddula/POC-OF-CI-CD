import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items')
      setItems(res.data)
    } catch (err) {
      console.error('Error fetching items:', err)
    }
  }

  const addItem = async () => {
    try {
      await axios.post('http://localhost:5000/api/items', { name: newItem })
      setNewItem('')
      fetchItems()
    } catch (err) {
      console.error('Error adding item:', err)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="App">
      <h1>POC CI/CD - MongoDB + Express + React</h1>
      
      <div className="input-group">
        <input 
          type="text" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          placeholder="Add an item"
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
