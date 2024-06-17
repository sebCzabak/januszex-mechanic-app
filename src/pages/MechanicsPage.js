import React, { useEffect, useState } from 'react';
import { fetchMechanicsOrders, acceptOrder, requestParts } from '../services/api';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // Importowanie useAuth

Modal.setAppElement('#root');

const MechanicsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [parts, setParts] = useState('');
  const { userEmail } = useAuth(); // Używanie useAuth

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchMechanicsOrders();
        console.log('Fetched orders:', data); // Debugging: check fetched data
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      await acceptOrder(orderId);
      toast.success('Order accepted successfully');
      const updatedOrders = await fetchMechanicsOrders();
      setOrders(updatedOrders);
    } catch (err) {
      toast.error('Failed to accept order');
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
    setParts('');
  };

  const handleRequestParts = async () => {
    try {
      await requestParts(selectedOrder.id, parts);
      toast.success('Parts requested successfully');
      closeModal();
    } catch (err) {
      toast.error('Failed to request parts');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Zlecenia mechaników</h1>
      <div className="flex justify-center">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Nazwa</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="py-2 px-4 border-b text-left">{order.orderId}</td>
                <td className="py-2 px-4 border-b text-left">{order.name}</td>
                <td className="py-2 px-4 border-b text-left">{order.status}</td>
                <td className="py-2 px-4 border-b text-left">
                  <button
                    onClick={() => handleAcceptOrder(order.orderId)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Akceptuj
                  </button>
                  <button
                    onClick={() => openModal(order)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Zamów części
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Request Parts"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Zamów części</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="parts"
          >
            Części
          </label>
          <textarea
            id="parts"
            value={parts}
            onChange={(e) => setParts(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleRequestParts}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Zamów
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Anuluj
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MechanicsPage;
