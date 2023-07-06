import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Favorite = () => {
  const [favoritePlayers, setFavoritePlayers] = useState([]);

  useEffect(() => {
    const fetchFavoritePlayers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/api/user/favplayers', { token });
        const favoritePlayersData = response.data.map((name) => {
          const [first_name, last_name] = name.split(' '); // Separar el nombre completo en first_name y last_name
          return { first_name, last_name };
        });
        setFavoritePlayers(favoritePlayersData);
      } catch (error) {
        console.log('Error al obtener los jugadores favoritos:', error);
      }
    };

    fetchFavoritePlayers();
  }, []);

  return (
    <section id="favorite">
      <div className="container mx-auto grid grid-cols-3 gap-4">
        {favoritePlayers.length > 0 ? (
          favoritePlayers.map((player, index) => (
            <div key={index} className="col-span-1">
              <div className="max-h-[150px] flex flex-col items-left bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg md:order-first"
                  src={`/img/${player.first_name}${player.last_name}.png`}
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {player.first_name} {player.last_name}
                  </h5>
                  <Link
                    to={`/player-info/${player.first_name} ${player.last_name}`}
                    className="px-4 py-2 mt-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-700"
                  >
                    Stats
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No hay jugadores favoritos</div>
        )}
      </div>
    </section>
  );
};

export default Favorite;
