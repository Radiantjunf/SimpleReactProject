import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom';
import Post from './Post';
import logo from './logo.svg';
import './App.css';
import { useTheme } from './ThemeContext';

function App() {
  const [data, setData] = useState([]);
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Replace with your API URL
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <Router>
      <div className={theme}>
        <div className="header">
          <h1>Dashboard</h1>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <Routes> {/* Updated component */}
          <Route exact path="/" element={
            <div className="grid-container">
              {data.map(item => (
                <div key={item.id} className="grid-item">
                  <Link to={`/post/${item.id}`}>
                    <h2>{item.title}</h2>
                  </Link>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          } />
          <Route path="/post/:id" element={<Post />} /> {/* Updated syntax */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;