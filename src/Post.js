import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from './ThemeContext';

function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className={theme}>
        <div className="header">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    </div>
  );
}

export default Post;
