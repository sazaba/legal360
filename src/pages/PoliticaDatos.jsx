import React, { useEffect } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

import JesusTyping from '../assets/videos/JesusTyping.MOV';
import BoardTeam from '../assets/videos/BoardTeam.MOV';

const PoliticaDatos = () => {
    useEffect(() => {
        window.scrollTo(0, 0);

        const handleContextMenu = (e) => e.preventDefault();
        const blockKeys = (e) => {
            if (
                (e.ctrlKey && ['p', 's', 'u', 'c'].includes(e.key.toLowerCase())) ||
                e.key === 'PrintScreen'
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('keydown', blockKeys);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('keydown', blockKeys);
        };
    }, []);

    const zoomPluginInstance = zoomPlugin();

    return (
        <section className="relative w-full min-h-screen font-sans overflow-hidden select-none">
            {/* Capa oscura para legibilidad */}
            <div className="absolute inset-0 bg-[#001e33]/60 z-10"></div>

            {/* Contenido */}
            <div className="relative z-20 pt-32 pb-16 px-6 sm:px-10 text-white min-h-[200vh]">
                <div className="max-w-5xl mx-auto">
                    <h1 className=" text-center text-3xl sm:text-4xl font-bold mb-6 text-[#e6d769] border-b-4 border-[#e6d769] pb-2">
                        Política de Tratamiento de Datos Personales
                    </h1>

                    <p className="mb-8 text-base text-gray-200">
                        A continuación puede visualizar el documento oficial con la política de tratamiento de datos personales de <strong>Legal 360 S.A.S.</strong>
                    </p>

                    <article className="p-4 w-full rounded-md shadow-xl bg-white overflow-hidden select-none">
                        <div className="w-full h-full bg-white p-[10px] box-border">
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                <Viewer
                                    fileUrl="/documentos/Politica_Datos_Personales.pdf"
                                    plugins={[zoomPluginInstance]}
                                    defaultScale={SpecialZoomLevel.PageWidth}
                                />
                            </Worker>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default PoliticaDatos;
