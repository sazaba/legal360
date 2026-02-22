import { useState } from "react";
import axios from '../api/axios';
import Swal from "sweetalert2";
import bustos from '../assets/images/bustos.webp';

import {
    SolutionOutlined,
    FileTextOutlined,
    PhoneOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
} from "@ant-design/icons";

const FormularioPlanes = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        pais: 'Col',
        telefono: '',
        cargo: '',
        tamano_empresa: '',
        mensaje: '',
        autorizacion: '' // Inicializado en vacío para forzar la selección
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación extra de seguridad
        if (formData.autorizacion !== 'si') {
            Swal.fire({
                icon: 'warning',
                title: 'Autorización requerida',
                text: 'Debes autorizar el tratamiento de datos para poder enviar tus datos.',
                confirmButtonColor: '#001e33'
            });
            return;
        }

        setIsLoading(true);

        const data = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo_electronico: formData.email,
            pais_codigo: formData.pais,
            telefono: formData.telefono,
            cargo: formData.cargo,
            tamano_empresa: formData.tamano_empresa,
            mensaje: formData.mensaje,
            autorizacion_datos: formData.autorizacion === 'si' ? 1 : 0
        };

        try {
            console.log("Enviando datos:", data);
            const response = await axios.post("/api/diagnostico", data);
            
            console.log("Respuesta:", response);
            Swal.fire({
                icon: 'success',
                title: '¡Formulario enviado!',
                text: 'Gracias por contactarnos. Te responderemos pronto.',
                confirmButtonColor: '#001e33'
            });
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                pais: 'Col',
                telefono: '',
                cargo: '',
                tamano_empresa: '',
                mensaje: '',
                autorizacion: ''
            });
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar',
                text: 'Hubo un problema al enviar el formulario.',
                confirmButtonColor: '#e63946'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] w-full px-2 sm:px-4 py-10 font-sans rounded-none sm:rounded-2xl flex items-center justify-center">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl rounded-xl shadow-gray-400 shadow-lg overflow-hidden">
                <div className="bg-white w-full lg:w-[45%] p-6 sm:p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-[#001e33] mb-4 text-center">
                        Agenda tu Diagnóstico Gratuito
                    </h2>
                    <p className="text-sm text-justify text-gray-700 leading-relaxed mb-4">
                        Si usted es una persona jurídica o natural y requiere conocer cuál es su estado jurídico en materia de derecho laboral y comercial, diligencie la siguiente información.
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-[#001e33] text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <label className="sr-only" htmlFor="nombre">Nombre</label>
                            <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Nombre*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" />
                            <label className="sr-only" htmlFor="apellido">Apellido</label>
                            <input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Apellido*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" />
                        </div>

                        <label className="sr-only" htmlFor="email">Correo electrónico</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Correo electrónico*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" />

                        <div className="flex flex-col sm:flex-row gap-3">
                            <label className="sr-only" htmlFor="pais">País</label>
                            <select id="pais" name="pais" value={formData.pais} onChange={handleChange} required className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 sm:w-1/3">
                                <option value="Col">Col</option>
                            </select>
                            <label className="sr-only" htmlFor="telefono">Teléfono</label>
                            <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="+57" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 sm:w-2/3" />
                        </div>

                        <label className="sr-only" htmlFor="cargo">Cargo</label>
                        <select id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full">
                            <option value="">Cargo*</option>
                            <option value="Gerente">Gerente/Fundador/Socio</option>
                            <option value="Administrador">Administrador/Contador</option>
                            <option value="RRHH">Recursos Humanos</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <label className="sr-only" htmlFor="tamano_empresa">Tamaño de empresa</label>
                        <select id="tamano_empresa" name="tamano_empresa" value={formData.tamano_empresa} onChange={handleChange} required className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full">
                            <option value="">Tamaño de empresa*</option>
                            <option value="1 a 10">1 a 10</option>
                            <option value="11 a 100">11 a 100 empleados</option>
                            <option value="101 en adelante">101 en adelante</option>
                        </select>

                        <label className="sr-only" htmlFor="mensaje">Mensaje o consulta</label>
                        <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} rows="3" required placeholder="Mensaje o consulta" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" />

                        {/* SECCIÓN DE AUTORIZACIÓN ADAPTADA */}
                        <div className="flex flex-col gap-2 text-xs text-gray-700 leading-snug text-justify mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                            <p>
                                En virtud de lo anterior, autorizo o no autorizo a LEGAL 360 S.A.S., para que realice tratamiento de mis datos personales y emita respuesta a inquietudes, envíe publicidad, comunicaciones, promociones, invitaciones a eventos, noticias, encuestas y cualquier información comercial a través de este medio.
                            </p>
                            <div className="flex items-center gap-6 mt-1 font-semibold">
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="autorizacion" 
                                        value="si" 
                                        checked={formData.autorizacion === 'si'} 
                                        onChange={handleChange} 
                                        required 
                                        className="accent-[#e6d769] w-4 h-4 cursor-pointer" 
                                    />
                                    Autorizo
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="autorizacion" 
                                        value="no" 
                                        checked={formData.autorizacion === 'no'} 
                                        onChange={handleChange} 
                                        required 
                                        className="accent-[#e6d769] w-4 h-4 cursor-pointer" 
                                    />
                                    No autorizo
                                </label>
                            </div>
                            {formData.autorizacion === 'no' && (
                                <p className="text-red-500 text-xs mt-1 font-semibold">
                                    Debes autorizar el tratamiento de datos para enviar el formulario.
                                </p>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading || formData.autorizacion === 'no'} 
                            className={`w-full mt-2 bg-[#001e33] hover:bg-[#0b2a4d] text-white font-semibold py-2 rounded-md text-sm ${(isLoading || formData.autorizacion === 'no') ? 'opacity-50 cursor-not-allowed' : 'transition-colors duration-300'}`}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>
                {/* Panel derecho - 70% */}
                <div
                    className="relative w-full lg:w-[55%] text-white flex flex-col justify-center items-center text-center overflow-hidden"
                    style={{
                        backgroundImage: `url(${bustos})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Capa de color con opacidad */}
                    <div className="absolute inset-0 bg-[#001e33]/70 z-10 pointer-events-none"></div>

                    {/* Contenido */}
                    <div className="relative z-20 p-8 w-full max-w-3xl">
                        <h3 className="text-3xl font-bold mb-8 text-[#fcd34d] text-center flex items-center justify-center gap-3">
                            <SolutionOutlined className="text-4xl" />
                            Planes de Asesoría Legal
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                            {/* Plan Mensual */}
                            <div className="bg-white text-[#1d1d1b] p-6 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300">
                                <h4 className="text-xl font-bold mb-4 text-center">Plan Mensual</h4>
                                <p className="text-sm mb-4">Ideal para empresas que requieren un respaldo jurídico preventivo.</p>
                                <ul className="mt-3 list-none space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><CheckCircleOutlined className="mt-1 text-[#001e33]" />Acompañamiento legal continuo en derecho laboral, comercial y Seguridad y Salud en el Trabajo.</li>
                                    <li className="flex items-start gap-2"><PhoneOutlined className="mt-1 text-[#001e33]" />Consultas jurídicas ilimitadas por correo electrónico, teléfono, videollamada o Whatsapp.</li>
                                    <li className="flex items-start gap-2"><FileTextOutlined className="mt-1 text-[#001e33]" />Revisión y elaboración de documentos legales.</li>
                                    <li className="flex items-start gap-2"><CheckCircleOutlined className="mt-1 text-[#001e33]" />Alerta de vencimientos legales y gestión de riesgos jurídicos.</li>
                                    <li className="flex items-start gap-2"><SolutionOutlined className="mt-1 text-[#001e33]" />Capacitaciones jurídicas a tu equipo.</li>
                                </ul>
                            </div>

                            {/* Servicio por Evento */}
                            <div className="bg-white text-[#1d1d1b] p-6 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300">
                                <h4 className="text-xl font-bold mb-4 text-center">Servicios por Evento</h4>
                                <p className="text-sm mb-4">Para empresas que requieren apoyo jurídico puntual en casos específicos.</p>
                                <ul className="mt-3 list-none space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><CheckCircleOutlined className="mt-1 text-[#001e33]" />Asesoría especializada para un caso o situación puntual.</li>
                                    <li className="flex items-start gap-2"><SolutionOutlined className="mt-1 text-[#001e33]" />Estrategias jurídicas enfocadas en resultados inmediatos.</li>
                                    <li className="flex items-start gap-2"><FileTextOutlined className="mt-1 text-[#001e33]" />Gestión en trámites, reclamaciones, auditorias o requerimientos.</li>
                                    <li className="flex items-start gap-2"><CheckCircleOutlined className="mt-1 text-[#001e33]" />No requiere compromiso mensual.</li>
                                    <li className="flex items-start gap-2"><CalendarOutlined className="mt-1 text-[#001e33]" />Tiempo de respuesta prioritario según disponibilidad.</li>
                                </ul>
                            </div>
                        </div>

                        <a
                            href="https://wa.link/twbzum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block cursor-pointer"
                        >
                            <p className="cursor-pointer mt-8 text-sm sm:text-base font-semibold text-[#1d1d1b] px-4 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300" style={{ background: "linear-gradient(135deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)" }}>
                                <CalendarOutlined className="mr-2 text-lg align-middle cursor-pointer" />
                                AGENDA <br />TU PRIMERA CONSULTA
                            </p>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FormularioPlanes;