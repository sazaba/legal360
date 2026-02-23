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
        autorizacion: '' 
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
        
        if (formData.autorizacion !== 'si') {
            Swal.fire({
                icon: 'warning',
                title: 'Autorización requerida',
                text: 'Debes autorizar el tratamiento de datos para poder enviar tus datos.',
                confirmButtonColor: '#001e33',
                customClass: { popup: 'rounded-2xl shadow-2xl' }
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
                confirmButtonColor: '#d4af37',
                customClass: { popup: 'rounded-2xl shadow-2xl' }
            });
            setFormData({
                nombre: '', apellido: '', email: '', pais: 'Col', telefono: '', cargo: '', tamano_empresa: '', mensaje: '', autorizacion: ''
            });
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar',
                text: 'Hubo un problema al enviar el formulario.',
                confirmButtonColor: '#e63946',
                customClass: { popup: 'rounded-2xl shadow-2xl' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Usamos isolate y py-generosos para separar bien la sección
        <section className="relative w-full min-h-[100svh] bg-[#0c111b] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 flex items-center justify-center isolate">
            
            {/* Contenedor Principal Grid */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                {/* ================= PANEL IZQUIERDO: FORMULARIO ================= */}
                <div className="lg:col-span-5 bg-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#001e33] font-montserrat mb-4 tracking-tight">
                            Agenda tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8860b]">Diagnóstico</span>
                        </h2>
                        <p className="text-sm text-gray-500 font-roboto leading-relaxed">
                            Conoce tu estado jurídico en materia laboral y comercial. Déjanos tus datos y un experto se comunicará contigo.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-[#001e33] text-sm font-roboto">
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Nombre*" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />
                            <input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Apellido*" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />
                        </div>

                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Correo electrónico*" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />

                        <div className="flex gap-4">
                            <select id="pais" name="pais" value={formData.pais} onChange={handleChange} required 
                                className="w-1/3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 cursor-pointer">
                                <option value="Col">Col (+57)</option>
                            </select>
                            <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="Número de teléfono*" 
                                className="w-2/3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <select id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 cursor-pointer text-gray-600">
                                <option value="">Cargo*</option>
                                <option value="Gerente">Gerente / Socio</option>
                                <option value="Administrador">Administrador</option>
                                <option value="RRHH">Recursos Humanos</option>
                                <option value="Otro">Otro</option>
                            </select>

                            <select id="tamano_empresa" name="tamano_empresa" value={formData.tamano_empresa} onChange={handleChange} required 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 cursor-pointer text-gray-600">
                                <option value="">Tamaño de empresa*</option>
                                <option value="1 a 10">1 a 10 empleados</option>
                                <option value="11 a 100">11 a 100 empleados</option>
                                <option value="101 en adelante">Más de 100</option>
                            </select>
                        </div>

                        <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} rows="3" required placeholder="Cuéntanos brevemente tu caso o consulta*" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 resize-none placeholder-gray-400" />

                        {/* Caja de Autorización Premium */}
                        <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-5 space-y-4 shadow-inner">
                            <p className="text-xs text-gray-500 text-justify leading-relaxed">
                                Autorizo a LEGAL 360 S.A.S. para el tratamiento de mis datos personales, envío de respuestas, publicidad, invitaciones a eventos y encuestas a través de este medio.
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-6 font-medium">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" name="autorizacion" value="si" checked={formData.autorizacion === 'si'} onChange={handleChange} required 
                                        className="w-4 h-4 text-[#d4af37] bg-white border-gray-300 focus:ring-[#d4af37] cursor-pointer" />
                                    <span className="group-hover:text-[#d4af37] transition-colors">Sí, autorizo</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" name="autorizacion" value="no" checked={formData.autorizacion === 'no'} onChange={handleChange} required 
                                        className="w-4 h-4 text-[#d4af37] bg-white border-gray-300 focus:ring-[#d4af37] cursor-pointer" />
                                    <span className="group-hover:text-red-500 transition-colors">No autorizo</span>
                                </label>
                            </div>

                            {formData.autorizacion === 'no' && (
                                <p className="text-red-500 text-xs font-semibold animate-pulse">
                                    * La autorización es obligatoria para enviar el formulario.
                                </p>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading || formData.autorizacion === 'no'} 
                            className={`w-full mt-2 font-montserrat font-bold py-4 rounded-xl text-sm tracking-wide shadow-lg transform active:scale-95 transition-all duration-300 uppercase
                                ${(isLoading || formData.autorizacion === 'no') 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                                    : 'bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)]'
                                }`}
                        >
                            {isLoading ? 'Procesando solicitud...' : 'Solicitar Diagnóstico'}
                        </button>
                    </form>
                </div>

                {/* ================= PANEL DERECHO: VISUAL & PLANES ================= */}
                <div className="lg:col-span-7 relative flex flex-col justify-center p-6 sm:p-10 lg:p-14 overflow-hidden min-h-[600px] lg:min-h-full">
                    
                    {/* Imagen de fondo optimizada para Safari (Cero glitches) */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={bustos} 
                            alt="Abogados Legal 360" 
                            loading="lazy"
                            className="w-full h-full object-cover transform-gpu will-change-transform"
                        />
                        {/* Overlays para profundidad y contraste */}
                        <div className="absolute inset-0 bg-[#001e33]/85 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001e33] via-transparent to-[#001e33]/50"></div>
                    </div>

                    <div className="relative z-10 w-full h-full flex flex-col justify-center">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-[#fcd34d] text-center font-montserrat flex items-center justify-center gap-4 drop-shadow-md">
                            <SolutionOutlined className="text-4xl" />
                            Nuestros Planes
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            
                            {/* Tarjeta Plan Mensual - Estilo Glassmorphism Oscuro */}
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-white/15 hover:border-[#e6d769]/50 hover:-translate-y-1 transition-all duration-300 group">
                                <h4 className="text-xl font-bold mb-3 text-white text-center font-montserrat uppercase tracking-wider group-hover:text-[#e6d769] transition-colors">Plan Mensual</h4>
                                <p className="text-xs text-gray-300 text-center mb-6 font-light">Ideal para el respaldo jurídico continuo de tu empresa.</p>
                                
                                <ul className="space-y-3 text-sm text-gray-200 font-roboto">
                                    <li className="flex items-start gap-3"><CheckCircleOutlined className="mt-0.5 text-[#e6d769]" />Acompañamiento legal en derecho laboral, comercial y SST.</li>
                                    <li className="flex items-start gap-3"><PhoneOutlined className="mt-0.5 text-[#e6d769]" />Consultas ilimitadas (Email, Teléfono, WhatsApp).</li>
                                    <li className="flex items-start gap-3"><FileTextOutlined className="mt-0.5 text-[#e6d769]" />Revisión y elaboración documental.</li>
                                    <li className="flex items-start gap-3"><CheckCircleOutlined className="mt-0.5 text-[#e6d769]" />Gestión de riesgos y alertas legales.</li>
                                </ul>
                            </div>

                            {/* Tarjeta Por Evento - Estilo Glassmorphism Oscuro */}
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-white/15 hover:border-[#e6d769]/50 hover:-translate-y-1 transition-all duration-300 group">
                                <h4 className="text-xl font-bold mb-3 text-white text-center font-montserrat uppercase tracking-wider group-hover:text-[#e6d769] transition-colors">Por Evento</h4>
                                <p className="text-xs text-gray-300 text-center mb-6 font-light">Apoyo jurídico puntual para casos específicos sin ataduras.</p>
                                
                                <ul className="space-y-3 text-sm text-gray-200 font-roboto">
                                    <li className="flex items-start gap-3"><CheckCircleOutlined className="mt-0.5 text-[#e6d769]" />Asesoría especializada para tu caso particular.</li>
                                    <li className="flex items-start gap-3"><SolutionOutlined className="mt-0.5 text-[#e6d769]" />Estrategias enfocadas en resultados inmediatos.</li>
                                    <li className="flex items-start gap-3"><FileTextOutlined className="mt-0.5 text-[#e6d769]" />Trámites, reclamaciones, auditorías o requerimientos.</li>
                                    <li className="flex items-start gap-3"><CalendarOutlined className="mt-0.5 text-[#e6d769]" />Cero compromisos mensuales, respuesta rápida.</li>
                                </ul>
                            </div>

                        </div>

                        {/* Botón Flotante CTA sobre la imagen */}
                        <div className="mt-12 flex justify-center">
                            <a
                                href="https://wa.link/twbzum"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] font-bold font-montserrat py-3 px-8 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                <CalendarOutlined className="text-xl" />
                                <span>AGENDA TU PRIMERA CONSULTA</span>
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default FormularioPlanes;