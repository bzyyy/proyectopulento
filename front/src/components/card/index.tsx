import { useEffect, useState } from 'react';

type Props = {
  id: number;
  date: string;
  homeTeamFullName: string;
  homeTeamScore: number;
  homeAbbreviation: string;
  season: number;
  status: string;
  visitorTeamFullName: string;
  visitorTeamScore: number;
  visitorAbbreviation: string;
  color?: string;
};

export function Card({ id, date, homeAbbreviation, visitorAbbreviation, homeTeamFullName, homeTeamScore, season, status, visitorTeamFullName, visitorTeamScore, color = 'blue' }: Props) {
  const [homeLogo, setHomeLogo] = useState('');
  const [visitorLogo, setVisitorLogo] = useState('');

  const checkLogoExists = (logoPath) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = logoPath;
    });
  };
  useEffect(() => {
  const homeLogoPath = `/teams/${homeAbbreviation}.svg`;
  const visitorLogoPath = `/teams/${visitorAbbreviation}.svg`;

  Promise.all([
    checkLogoExists(homeLogoPath),
    checkLogoExists(visitorLogoPath),
  ])
    .then(([homeLogoExists, visitorLogoExists]) => {
      setHomeLogo(homeLogoExists ? homeLogoPath : '');
      setVisitorLogo(visitorLogoExists ? visitorLogoPath : '');
    })
    .catch((error) => {
      console.log('Error al cargar las imágenes de los logotipos:', error);
    });
}, [homeAbbreviation, visitorAbbreviation]);

  return (
    <figure className="bg-[#fafafa] hover:bg-[#e0ac98] rounded-lg overflow-hidden p-4 cursor-pointer transition-all group/card" style={{ width: '20em', height: '30em' }}>
      <div className="rounded-lg overflow-hidden mb-4 relative">
        <div
          className={`bg-cover aspect-square relative border-b-4 bg-center after:bg-gradient-to-b after:absolute after:from-transparent after:to-black after:top-0 after:left-0 after:right-0 after:bottom-0 after:w-full after:h-full`}
          style={{
            backgroundImage: `linear-gradient(to bottom, orange, black)`,
          }}
        >
          <div className="flex items-center justify-center">
            {homeLogo && <img src={homeLogo} alt={homeAbbreviation} className="h-2/5 w-2/5 mx-2 logo" />}
          <h1 style={{ borderLeftColor: color }} className="text-white drop-shadow-md text-center border-1-4 pl-4 font-bold absolute top-20 z-10 w-full pr-0">
            <br /> Local: <br />
              {homeTeamFullName} ({homeAbbreviation})
            <br /> vs
            <br /> Visitor: <br />
              {visitorTeamFullName} ({visitorAbbreviation})
            <br />
              {homeTeamScore} - {visitorTeamScore}
            </h1>
              {visitorLogo && <img src={visitorLogo} alt={visitorAbbreviation} className="h-2/5 w-2/5 mx-2 logo" />}
          </div>
        </div>
      </div>
    <figcaption className="flex flex-col items-center text-center">
      <p className="text-black-300">{date}</p>
      <p className="text-black-300">Season: {season}</p>
      <p className="text-black-300">Status: {status}</p>
    </figcaption>
  </figure>
);
}
