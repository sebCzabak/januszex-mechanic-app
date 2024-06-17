import React, { useEffect, useState } from 'react';
import { fetchWarehouseParts } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Importowanie useAuth

const WarehousePage = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userEmail } = useAuth(); // Używanie useAuth

  useEffect(() => {
    const getParts = async () => {
      try {
        const data = await fetchWarehouseParts();
        console.log('Fetched parts:', data); // Debugging: check fetched data
        setParts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getParts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Magazyn</h1>
      <div className="flex justify-center">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Nazwa</th>
              <th className="py-2 px-4 border-b text-left">Ilość</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.partId}>
                <td className="py-2 px-4 border-b text-left">{part.partId}</td>
                <td className="py-2 px-4 border-b text-left">{part.name}</td>
                <td className="py-2 px-4 border-b text-left">{part.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehousePage;
