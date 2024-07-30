import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching products', error);
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-3xl">Store</h1>
        </header>
        <main className="p-4">
          {error && <div className="text-red-500">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
