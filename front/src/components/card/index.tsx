type Props = {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
  color?:string;
};


export function Card({ key, group, title, description, active, has_outrights, color = "blue" }: Props) {
  return (
    <figure className="bg-[#ffffff] hover:bg-[#282828] rounded-lg overflow-hidden p-4 cursor-pointer transition-all group/card">
      <div className="rounded-lg overflow-hidden mb-4 relative">
        <div
          style={{
            backgroundColor: color,
          }}
          className={`bg-cover aspect-square relative border-b-4 bg-center after:bg-gradient-to-b after:absolute after:from-transparent after:to-black after:top-0 after:left-0 after:right-0 after:bottom-0 after:w-full after:h-full`}
        >
          <h1
            style={{ borderLeftColor: color }}
            className={`text-white drop-shadow-md border-l-4 pl-4 font-bold absolute bottom-4 z-10 truncate w-full pr-4`}
          >
            {title}
          </h1>
        </div>
        <svg
          width="14"
          height="17"
          viewBox="0 0 14 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-4 bottom-4 z-20 bg-green-500 rounded-full w-12 h-12 p-4 opacity-0 group-hover/card:opacity-100 transition-all hover:bg-green-400 hover:scale-110"
        >
          <path
            d="M0.5 15.2768V1.83167C0.5 1.0405 1.37525 0.562658 2.04076 0.990487L13.1132 8.10851C13.7447 8.51445 13.7204 9.44549 13.0686 9.81793L1.99614 16.1451C1.32948 16.526 0.5 16.0446 0.5 15.2768Z"
            fill="black"
          />
        </svg>
      </div>
      <figcaption>
        <h2 className="font-bold text-white mb-3 truncate">{title}</h2>
        <p className="text-gray-300">{key}</p>
        <p className="text-gray-300">{group}</p>
        <p className="text-gray-300">{title}</p>
        <p className="text-gray-300">{description}</p>
        <p className="text-gray-300">{active}</p>
        <p className="text-gray-300">{has_outrights}</p>
      </figcaption>
    </figure>
  );
}