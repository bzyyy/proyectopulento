import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PlayerSeason from "../player/PlayerSeason";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayerInfo = () => {
  const { playerName } = useParams();
  const [playerStats, setPlayerStats] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/players/${playerName}/stats`);
        const playerStatsData = response.data.data;
        setPlayerStats(playerStatsData);
      } catch (error) {
        console.log("Error al obtener las estadísticas del jugador:", error);
      }
    };

    const checkFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:3000/api/user/favplayers", { token });
        const favoritePlayersData = response.data;
        setIsFavorite(favoritePlayersData.includes(playerName));
      } catch (error) {
        console.log("Error al verificar el estado de favorito:", error);
      }
    };

    fetchPlayerStats();
    checkFavoriteStatus();
  }, [playerName]);

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("El usuario debe estar logueado para agregar a favoritos.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
      return;
    }
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:3000/api/user/favplayer?token=${token}&favplayer=${playerName}`);
        setIsFavorite(false);
        toast.error("Jugador eliminado de favoritos.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      } else {
        await axios.post("http://localhost:3000/api/user/favplayer", { playerName, token });
        setIsFavorite(true);
        toast.success("Jugador agregado a favoritos.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log("Error al agregar/eliminar de favoritos:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', options);
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <dt className="p-4 mb-2 text-3xl font-extrabold text-white">
        Player Name: {playerName}
        <span
          className={`cursor-pointer ${isFavorite ? 'text-yellow-400' : 'text-gray-400'} ml-2`}
          onClick={handleFavoriteClick}
        >
          ★
        </span>
      </dt>
      <PlayerSeason playerName={playerName} />
      {playerStats.map((stat) => (
        <div key={stat.id}>
          <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
            <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
              <dd className="text-gray-500 dark:text-gray-400">Date: {formatDate(stat.game.date)}</dd>
              <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">{stat.pts}</dt>
                  <dd className="text-gray-500 dark:text-gray-400">Puntos</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">{stat.reb}</dt>
                  <dd className="text-gray-500 dark:text-gray-400">Rebotes</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">{stat.ast}</dt>
                  <dd className="text-gray-500 dark:text-gray-400">Asistencias</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">{formatPercentage(stat.fg_pct)}</dt>
                  <dd className="text-gray-500 dark:text-gray-400">% Tiros de Campo</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">{formatPercentage(stat.fg3_pct)}</dt>
                  <dd className="text-gray-500 dark:text-gray-400">% Tiros de Tres</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">{formatPercentage(stat.ft_pct)}</dt>
                  <dd className="text-gray-500 dark:text-gray-400">% Tiros Libres</dd>
                  <ToastContainer />

                </div>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;
