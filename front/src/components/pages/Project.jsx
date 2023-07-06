import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../card/index';

function Project() {
  const [sports, setSports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/games/recent?numPage=${currentPage}`);
        const { data, meta } = response.data;
        console.log(response.data)
        if (Array.isArray(data)) {
          setSports(data);
        } else {
          setSports([data]);
        }
        setTotalPages(meta.total_pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSports();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', options);
  };

  return (
    <div className="mb-8">
      <section id="project">
        <div className="inline-flex flex-col mt-4">
          <div className="grid grid-cols-6 grid-flow-rows">
            {sports.map(sport => (
              <Card
                key={sport.id}
                id={sport.id}
                date={formatDate(sport.date)}
                homeTeamFullName={sport.home_team.full_name}
                homeTeamScore={sport.home_team_score}
                homeAbbreviation={sport.home_team.abbreviation}
                season={sport.season}
                status={sport.status}
                visitorTeamFullName={sport.visitor_team.full_name}
                visitorAbbreviation={sport.visitor_team.abbreviation}
                visitorTeamScore={sport.visitor_team_score}
              />
            ))}
          </div>
        </div>
       
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * 10 + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * 10 + sports.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalPages * 10}</span> Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
              </svg>
              Prev
            </button>
            <button
              className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Project;
