import React, { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 4 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 4 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000); // Cambiar el slide cada 5 segundos

    return () => {
      clearInterval(interval);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <section id="home">
      

      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {/* Item 1 */}
          <div
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-opacity duration-700 ease-in-out ${
              currentSlide === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item
          >
            <img
              src="/carrusel/aro.png"
              className="object-cover"
              alt="Aro"
            />
          </div>
          {/* Item 2 */}
          <div
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-opacity duration-700 ease-in-out ${
              currentSlide === 1 ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item
          >
            <img
              src="/carrusel/aro2.png"
              className="object-cover"
              alt="Aro 2"
            />
          </div>
          {/* Item 3 */}
          <div
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-opacity duration-700 ease-in-out ${
              currentSlide === 2 ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item
          >
            <img
              src="/carrusel/dunk.png"
              className="object-cover"
              alt="Dunk"
            />
          </div>
          {/* Item 4 */}
          <div
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-opacity duration-700 ease-in-out ${
              currentSlide === 3 ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item
          >
            <img
              src="/carrusel/jordan.png"
              className="object-cover"
              alt="Jordan"
            />
          </div>
          {/* Item 5 */}
          <div
            className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition-opacity duration-700 ease-in-out ${
              currentSlide === 4 ? 'opacity-100' : 'opacity-0'
            }`}
            data-carousel-item
          >
            <img
              src="/carrusel/lebron.png"
              className="object-cover"
              alt="LeBron"
            />
          </div>
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-gray-300'
              }`}
              aria-current={currentSlide === index ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrevSlide}
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-white dark:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNextSlide}
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-white dark:text-gray-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Testeando el Home
            <br className="hidden lg:inline-block" />
            NBeT Tus estadisticas favoritas.
          </h1>
          <p className="mb-8 leading-relaxed text-orange-600">Pagina en construccion</p>
        </div>
      </div>
    </section>
  );
}
