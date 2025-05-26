import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { HashLink as Link } from 'react-router-hash-link';
import { FileTextOutlined, TeamOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import v1 from '../assets/videos/sgsst.mp4';

const services = [
    {
        title: 'Protocolos y Políticas Legales',
        icon: <FileTextOutlined className="text-5xl text-[#e6d769]" />,
        description: 'Protocolos sobre acoso, teletrabajo y desconexión laboral.'
    },
    {
        title: 'Formación Legal Aplicada',
        icon: <TeamOutlined className="text-5xl text-[#e6d769]" />,
        description: 'Capacitaciones legales sobre acoso, sustancias y normativa.'
    },
    {
        title: 'Acompañamiento Legal Estratégico',
        icon: <SafetyCertificateOutlined className="text-5xl text-[#e6d769]" />,
        description: 'Asesoría en visitas del Ministerio, accidentes y contratos SST.'
    }
];

const SSTLegal360 = () => {
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
            <div className="relative z-20 px-6 py-20 lg:px-24 text-white">
                {/* Título animado */}
                <div className="max-w-6xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#e6d769] mb-4 tracking-widest">
                        <Typewriter
                            words={['Seguridad y Salud en el Trabajo']}
                            loop={Infinity}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Apoyo legal integral para el área de SST en tu empresa.
                    </p>
                </div>

                {/* Tarjetas de servicio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white/10 rounded-2xl shadow-md p-6 text-center backdrop-blur-md hover:scale-105 transition-transform duration-300 w-full max-w-sm"
                        >
                            <div className="flex justify-center mb-4">{service.icon}</div>
                            <h2 className="text-2xl font-semibold text-[#e6d769] mb-2">
                                {service.title}
                            </h2>
                            <p className="text-base md:text-lg text-gray-200">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Botón de regreso */}
                <div className="mt-20 text-center">
                    {/* Botón de regreso flotante */}
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

export default SSTLegal360;
