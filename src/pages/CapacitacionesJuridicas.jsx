import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { HashLink as Link } from 'react-router-hash-link';
import { BulbOutlined } from '@ant-design/icons';
import v1 from '../assets/videos/asesoria.mp4';

const CapacitacionesJuridicas = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden pt-10">
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
            <div className="relative z-20 px-6 py-20 lg:px-24 text-white text-center">
                {/* Título animado */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#e6d769] mb-4 tracking-widest">
                        <Typewriter
                            words={['Capacitaciones Jurídicas Empresariales']}
                            loop={Infinity}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </h1>
                    <p className="text-xl md:text-xl text-gray-200 max-w-4xl mx-auto">
                        Diseñamos y facilitamos formación legal para fortalecer competencias, prevenir riesgos y responder a los principales desafíos jurídicos que enfrentan las empresas hoy.
                    </p>
                </div>

                {/* Tarjeta única descriptiva */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/10 rounded-2xl shadow-md p-10 text-left backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <BulbOutlined className="text-5xl text-[#e6d769]" />
                            <h2 className="text-4xl font-semibold text-[#e6d769]">
                                Formación Jurídica Empresarial
                            </h2>
                        </div>
                        <p className="text-base md:text-lg text-gray-100 leading-relaxed">
                            Ofrecemos capacitación jurídica especializada en temas clave como el manejo legal de colaboradores vulnerables, nuevas licencias laborales, estabilidad reforzada, prevención del acoso laboral y gestión de incapacidades. Nuestras capacitaciones, presenciales o virtuales, combinan claridad, enfoque preventivo y aplicabilidad práctica. Además, entregamos materiales de apoyo y promovemos la actualización normativa para reducir riesgos jurídicos y fortalecer la gestión del talento humano.
                        </p>
                    </div>
                </div>

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
        </section>
    );
};

export default CapacitacionesJuridicas;
