type Props = {
  key: string;
  local: string;
  visita: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
  color?:string;
};


export function Card({ key, local, visita, description, active, has_outrights, color = "blue" }: Props) {
  return (
    <figure className="bg-[#ffffff] hover:bg-[#282828] rounded-lg overflow-hidden p-4 cursor-pointer transition-all group/card" style={{ width: '20em', height: '30em'}}>
      <div className="rounded-lg overflow-hidden mb-4 relative">
        <div
          style={{
            backgroundColor: color,
          }}
          className={`bg-cover aspect-square relative border-b-4 bg-center after:bg-gradient-to-b after:absolute after:from-transparent after:to-black after:top-0 after:left-0 after:right-0 after:bottom-0 after:w-full after:h-full`}
        >
          <h1
            style={{ borderLeftColor: color }}
            className={`text-white drop-shadow-md border-1-4 pl-4 font-bold absolute top-6 z-6 w-full pr-0`}
          >
            {local}
            <br/> vs <br />
            {visita}
           
          </h1>
        </div>
      </div>
      <figcaption>
        <h2 className="font-bold text-white mb-3 truncate">{key}</h2>
        <p className="text-gray-300">{key}</p>
        <p className="text-gray-300">{local} vs </p>
        <p className="text-gray-300">{visita} </p>
        <p className="text-gray-300">{description}</p>
        <p className="text-gray-300">{active}</p>
        <p className="text-gray-300">{has_outrights}</p>
      </figcaption>
    </figure>
  );
}