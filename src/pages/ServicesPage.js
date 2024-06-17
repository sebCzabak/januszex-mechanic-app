import React, { useEffect, useState } from 'react';
import { fetchServices, createOrder } from '../services/api';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

Modal.setAppElement('#root');

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const { isLoggedIn, userEmail } = useAuth();

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getServices();
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedService(null);
    setDate('');
    setDescription('');
  };

  const handleOrderSubmit = async () => {
    if (!date || !description) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      const orderData = {
        servicesIds: [selectedService.serviceId],
        serviceName: selectedService.name,
        date,
        description,
        userId: userEmail,
      };
      console.log('Order Data:', orderData); // Debugging: log data before sending
      await createOrder(orderData);
      toast.success('Order created successfully');
      closeModal();
    } catch (err) {
      toast.error('Failed to create order');
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
      <h1 className="text-3xl font-bold mb-4 text-center">Usługi</h1>
      <div className="flex justify-center">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nazwa</th>
              <th className="py-2 px-4 border-b">Opis</th>
              <th className="py-2 px-4 border-b">Cena</th>
              {isLoggedIn && <th className="py-2 px-4 border-b">Akcje</th>}
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.serviceId}>
                <td className="py-2 px-4 border-b">{service.name}</td>
                <td className="py-2 px-4 border-b">{service.description}</td>
                <td className="py-2 px-4 border-b">{service.price}</td>
                {isLoggedIn && (
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openModal(service)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Zamów
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Service"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl font-bold mb-4">Zamów Usługę</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Data
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Opis
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleOrderSubmit}
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

export default ServicesPage;
