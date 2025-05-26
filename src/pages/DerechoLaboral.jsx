import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { HashLink as Link } from 'react-router-hash-link';
import {
    FaGavel,
    FaFileAlt,
    FaUserShield,
    FaClipboardList,
    FaLock
} from 'react-icons/fa';
import v1 from '../assets/videos/estatuajusticia.mp4';

const services = [
    {
        title: 'Asesoría Laboral',
        icon: <FaUserShield className="text-5xl text-[#e6d769]" />,
        description: 'Vinculación laboral, contratos y cumplimiento legal.'
    },
    {
        title: 'Documentación Interna',
        icon: <FaFileAlt className="text-5xl text-[#e6d769]" />,
        description: 'Reglamentos, manuales y capacitación legal.'
    },
    {
        title: 'Procesos Disciplinarios',
        icon: <FaGavel className="text-5xl text-[#e6d769]" />,
        description: 'Citas, decisiones y terminación legal.'
    },
    {
        title: 'Seguridad Social',
        icon: <FaClipboardList className="text-5xl text-[#e6d769]" />,
        description: 'Afiliaciones, pagos y licencias.'
    },
    {
        title: 'Normativa Legal',
        icon: <FaLock className="text-5xl text-[#e6d769]" />,
        description: 'Confidencialidad, habeas data y bienestar.'
    }
];

const DerechoLaboral = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden pt-6">
            {/* Video de fondo */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={v1} type="video/mp4" />
                Tu navegador no soporta el video.
            </video>

            {/* Capa oscura */}
            <div className="absolute inset-0 bg-[#001e33]/60 z-10" />

            {/* Contenido */}
            <div className="relative z-20 px-6 py-20 lg:px-24 text-white">
                {/* Título animado */}
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#e6d769] mb-4 tracking-widest">
                        <Typewriter
                            words={['Derecho Laboral y Seguridad Social']}
                            loop={Infinity}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Soluciones legales clave para empresas y trabajadores.
                    </p>
                </div>

                {/* Grid de tarjetas con espaciado uniforme */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white/10 rounded-2xl shadow-md p-6 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full max-w-md"
                        >
                            <div className="flex justify-center mb-4">{service.icon}</div>
                            <h2 className="text-2xl font-semibold text-[#e6d769] mb-2">
                                {service.title}
                            </h2>
                            <p className="text-lg text-gray-200">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Botón de regreso */}
                <div className="mt-20 text-center">
                    <Link
                        to="/#servicios"
                        className="bg-[#e6d769] hover:bg-[#f1e28c] text-[#001e33] font-bold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base md:text-lg font-roboto shadow-lg transition-all duration-300 transform hover:scale-105 z-50 
             fixed sm:top-25 sm:left-6 sm:inline-block hidden"
                    >
                        Regresar
                    </Link>

                    <div className="block sm:hidden mt-20 text-center">
                        <Link
                            to="/#servicios"
                            className="inline-block bg-gradient-to-r from-[#e6d769] to-[#95642a] text-[#001e33] font-bold py-3 px-6 rounded-full text-sm shadow-md hover:scale-105 transition duration-300"
                        >
                            Regresar
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DerechoLaboral;