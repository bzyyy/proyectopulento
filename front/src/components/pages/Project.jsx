import { Card } from "../card/index";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Project() {
  
    const [sports, setSports] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3000/api/sports')
        .then(response => setSports(response.data))
        .catch(error => console.log(error));
    }, []);
  
    return (
      <>
      <section id="project">
        <div className=" inline-flex flex-col">     
        <div className="grid grid-cols-6 grid-flow-rows">
            {sports.map(sport => (
            <Card 
                key={sport.key}
                local={sport.home_team}
                visita = {sport.away_team}
                description={sport.commence_time}
                active={sport.active}
                has_outrights={sport.has_outrights}     
            />
          ))}
          </div>
        </div>
        </section>
    </>
    );
  }
  
  export default Project;
  