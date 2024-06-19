import React, { useEffect, useState } from 'react';
import { fetchWarehouseParts, fetchPartRequests } from '../services/api';
import { useAuth } from '../context/AuthContext'; // Importowanie useAuth

const WarehousePage = () => {
  const [parts, setParts] = useState([]);
  const [partRequests, setPartRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useAuth(); // Używanie useAuth

  useEffect(() => {
    const getParts = async () => {
      try {
        const partsData = await fetchWarehouseParts();
        const partRequestsData = await fetchPartRequests();
        console.log('Fetched parts:', partsData); // Debugging: check fetched data
        console.log('Fetched part requests:', partRequestsData); // Debugging: check fetched data
        setParts(partsData);
        setPartRequests(partRequestsData);
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
      <div className="flex justify-center mb-8">
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
      <h2 className="text-2xl font-bold mb-4 text-center">Zapytania o części</h2>
      <div className="flex justify-center">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Mechanik</th>
              <th className="py-2 px-4 border-b text-left">Części</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {partRequests.map((request) => (
              <tr key={request.requestId}>
                <td className="py-2 px-4 border-b text-left">{request.requestId}</td>
                <td className="py-2 px-4 border-b text-left">{request.mechanicName}</td>
                <td className="py-2 px-4 border-b text-left">{request.parts}</td>
                <td className="py-2 px-4 border-b text-left">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehousePage;
