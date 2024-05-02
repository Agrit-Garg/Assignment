import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {UserContext} from '../context/UserContext'
import {useNavigate } from 'react-router-dom';

const PostList = () => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=5ef349ce4b3d472591a9cbace48ce6fe&page=${page}`
      );
      setArticles((prevArticles) => [
        ...prevArticles,
        ...response.data.articles,
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return  user? (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Latest News</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {articles.map((article, index) =>
          // Check if required fields exist before rendering
          article.urlToImage && article.title ? (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600">{article.description}</p>
              </div>
            </motion.div>
          ) : null
        )}
      </motion.div>
      {isLoading && <p className="text-center mt-4">Loading...</p>}
      {!isLoading && (
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-300"
            onClick={loadMore}
          >
            Load More
          </button>
        </motion.div>
      )}
    </div>
  ):(
    navigate('/login')
  );
};

export default PostList;
