import React, { useEffect, useState } from 'react';
import { fetchUnsplashImage } from '../services/api';

const HomePage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const imageUrl = fetchUnsplashImage();
    setBackgroundImage(imageUrl);
  }, []);

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex justify-center items-center h-full bg-black bg-opacity-50">
        <div className="text-center p-4 max-w-3xl">
          <h1 className="text-5xl text-white font-bold mb-4">Witamy w serwisie Januszex</h1>
          <p className="text-xl text-white mb-4">Na naszej stronie możesz:</p>
          <ul className="list-disc list-inside text-lg text-white text-left mx-auto">
            <li>Przeglądać nasze usługi i cennik</li>
            <li>Zarejestrować się i zalogować, aby mieć dostęp do pełnej funkcjonalności</li>
            <li>Składać zamówienia na usługi naprawy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
