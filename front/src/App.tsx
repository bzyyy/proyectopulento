import { Card } from "./components/card";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

/*function App() {
  return (
    <>
      <div className="flex gap-4">
        {data.map((item) => (
          <Card
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            color={item.color}
          />
        ))}
      </div>
    </>
  );
}*/

function App() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/sports')
      .then(response => setSports(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className=" inline-flex flex-col">
      <h1 className=" mt-6 text-center font-semibold text-gray-900 dark:text-white">Primer Hook</h1>
        <div className="grid grid-rows-6 grid-flow-col gap-6">
        {sports.map(sport => (
        <Card 
            key={sport.key}
            group={sport.group}
            title={sport.title}
            description={sport.description}
            active={sport.active}
            has_outrights={sport.has_outrights}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
