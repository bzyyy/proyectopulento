import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PlayerSeason = ({ playerName }) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedStats, setSelectedStats] = useState('');

  useEffect(() => {
    getPlayerStats();
  }, [selectedSeasons, selectedStats, playerName]);

  const getPlayerStats = async () => {
    try {
      const responses = await Promise.all(
        selectedSeasons.map((season) =>
          axios.get(`http://localhost:3000/api/players/${playerName}/stats/average?season=${season}`)
        )
      );
  
      const stats = responses
        .filter((response) => response.data?.data?.length > 0)
        .map((response) => response.data.data[0]);
  
      setPlayerStats(stats);
    } catch (error) {
      console.log('Error al obtener las estadísticas por temporada:', error);
    }
  };

  const handleSeasonToggle = (season) => {
    if (selectedSeasons.includes(season)) {
      setSelectedSeasons(selectedSeasons.filter((s) => s !== season));
    } else {
      setSelectedSeasons([...selectedSeasons, season]);
    }
  };

  const handleStatsChange = (event) => {
    const selectedStatValue = event.target.value;
    setSelectedStats(selectedStatValue);
  };

  const renderChart = () => {
    if (!playerStats || playerStats.length === 0 || !selectedStats || selectedSeasons.length === 0) {
      return null;
    }
  
    const colors = randomColor({ count: selectedSeasons.length });
  
    const datasets = selectedSeasons.map((season, index) => {
      const seasonStats = playerStats.find((stats) => stats.season === season);
      const dataValue = seasonStats ? seasonStats[selectedStats] : 0; // Comprobación de valores undefined
      return {
        label: `Temporada ${season}`,
        data: [dataValue],
        fill: true,
        borderColor: colors[index],
        backgroundColor: colors[index],
        borderWidth: 2,
      };
    });
  
    const data = {
      labels: [selectedStats],
      datasets: datasets,
    };
  
    const options = {
      scales: {
        x: {
          ticks: {
            color: 'orange', // Cambiar el color de los números en el eje x
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)', // Cambiar el color de las líneas de la grilla en el eje x
          },
        },
        y: {
          type: 'linear',
          beginAtZero: true,
          ticks: {
            color: 'orange', // Cambiar el color de los números en el eje y
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.5)', // Cambiar el color de las líneas de la grilla en el eje y
          },
        },
      },
      layout: {
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        },
      },
    };
    
  
    return (
      <div style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    );
  };

  return (
    <div>
      <label htmlFor="seasons" className="  block mt-4 mb-2 ml-5 text-sm font-medium text-gray-900 dark:text-white">
        Select seasons
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          className={`bg-gray-300 rounded-lg ml-5 p-2 ${
            selectedSeasons.includes(2019) ? 'bg-orange-500' : ''
          }`}
          onClick={() => handleSeasonToggle(2019)}
        >
          2019
        </button>
        <button
          className={`bg-gray-300 rounded-lg p-2 ${
            selectedSeasons.includes(2020) ? 'bg-orange-500' : ''
          }`}
          onClick={() => handleSeasonToggle(2020)}
        >
          2020
        </button>
        <button
          className={`bg-gray-300 rounded-lg p-2 ${
            selectedSeasons.includes(2021) ? 'bg-orange-500' : ''
          }`}
          onClick={() => handleSeasonToggle(2021)}
        >
          2021
        </button>
        <button
          className={`bg-gray-300 rounded-lg p-2 ${
            selectedSeasons.includes(2022) ? 'bg-orange-500' : ''
          }`}
          onClick={() => handleSeasonToggle(2022)}
        >
          2022
        </button>
      </div>

      <label htmlFor="stats" className=" ml-5 block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Select stats
      </label>
      <select
        id="stats"
        className="bg-gray-50 border ml-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-120 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleStatsChange}
        value={selectedStats}
      >
        <option value="">-- Selecciona una estadística --</option>
        <option value="pts">Puntos por partido</option>
        <option value="reb">Rebotes por partido</option>
        <option value="ast">Asistencias por partido</option>
        {/* Agrega más estadísticas aquí si es necesario */}
      </select>

      {playerStats.length > 0 ? (
        <div>
          {renderChart()}
        </div>
      ) : (
        <p className='ml-5 mt-4 mb-4 text-orange-500'>  Cargando estadísticas por temporada...</p>
      )}
    </div>
  );
};

export default PlayerSeason;