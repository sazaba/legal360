import React, { useEffect } from 'react';

import JesusTyping from '../assets/videos/JesusTyping.MOV'
import BoardTeam from '../assets/videos/BoardTeam.MOV'

const PoliticaDatos = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="relative w-full min-h-screen font-sans overflow-hidden">
            {/* Video de fondo */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={BoardTeam} type="video/mp4" />
                Tu navegador no soporta videos HTML5.
            </video>

            {/* Capa oscura para legibilidad */}
            <div className="absolute inset-0 bg-[#001e33]/60 z-10"></div>

            {/* Contenido */}
            <div className="relative z-20 pt-32 pb-16 px-6 sm:px-10 text-white">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#e6d769] border-b-4 border-[#e6d769] pb-2">
                        Política de Tratamiento de Datos Personales
                    </h1>

                    <p className="mb-8 text-base text-gray-200">
                        A continuación puede visualizar el documento oficial con la política de tratamiento de datos personales de <strong>Legal 360 S.A.S.</strong>
                    </p>

                    <div className="m-auto w-[85%] h-[700px] rounded-xl border-[2px] border-[#e6d769] shadow-xl bg-white overflow-hidden">
                        <iframe
                            src="/documentos/Politica_Datos_Personales.pdf#toolbar=0&navpanes=0&scrollbar=1"
                            title="Política de Tratamiento de Datos"
                            width="100%"
                            height="100%"
                            className="rounded"
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PoliticaDatos;
