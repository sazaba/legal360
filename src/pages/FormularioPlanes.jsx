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
        nombre: '', apellido: '', email: '', pais: 'Col', telefono: '', cargo: '', tamano_empresa: '', mensaje: '', autorizacion: '' 
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.autorizacion !== 'si') {
            Swal.fire({
                icon: 'warning',
                title: 'Autorización requerida',
                text: 'Debes autorizar el tratamiento de datos para poder enviar tus datos.',
                confirmButtonColor: '#001e33',
                customClass: { popup: 'rounded-2xl shadow-2xl font-roboto' }
            });
            return;
        }

        setIsLoading(true);
        const data = {
            nombre: formData.nombre, apellido: formData.apellido, correo_electronico: formData.email, pais_codigo: formData.pais,
            telefono: formData.telefono, cargo: formData.cargo, tamano_empresa: formData.tamano_empresa, mensaje: formData.mensaje,
            autorizacion_datos: formData.autorizacion === 'si' ? 1 : 0
        };

        try {
            await axios.post("/api/diagnostico", data);
            Swal.fire({
                icon: 'success',
                title: '¡Formulario enviado!',
                text: 'Gracias por contactarnos. Te responderemos pronto.',
                confirmButtonColor: '#d4af37',
                customClass: { popup: 'rounded-2xl shadow-2xl font-roboto' }
            });
            setFormData({ nombre: '', apellido: '', email: '', pais: 'Col', telefono: '', cargo: '', tamano_empresa: '', mensaje: '', autorizacion: '' });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar',
                text: 'Hubo un problema al enviar el formulario.',
                confirmButtonColor: '#e63946',
                customClass: { popup: 'rounded-2xl shadow-2xl font-roboto' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Fondo continuo #f8fafc que recibe la ola del componente anterior
        <section className="relative w-full min-h-[100svh] flex flex-col lg:flex-row bg-[#f8fafc] overflow-hidden">
            
            {/* ================= MITAD IZQUIERDA: FORMULARIO ================= */}
            <div className="w-full lg:w-[45%] xl:w-5/12 px-6 sm:px-12 lg:px-16 pt-20 lg:pt-28 pb-16 flex flex-col justify-center">
                <div className="max-w-xl mx-auto w-full">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001e33] font-montserrat mb-4 tracking-tight">
                            Agenda tu <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8860b]">
                                Diagnóstico
                            </span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 font-roboto leading-relaxed">
                            Conoce tu estado jurídico en materia laboral y comercial. Déjanos tus datos y un experto se comunicará contigo.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 text-[#001e33] text-sm font-roboto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Nombre*" 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />
                            <input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Apellido*" 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />
                        </div>

                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Correo electrónico*" 
                            className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />

                        <div className="flex gap-4">
                            <select id="pais" name="pais" value={formData.pais} onChange={handleChange} required 
                                className="w-1/3 bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 cursor-pointer text-gray-600">
                                <option value="Col">Col (+57)</option>
                            </select>
                            <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="Número de teléfono*" 
                                className="w-2/3 bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 placeholder-gray-400" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <select id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 cursor-pointer text-gray-600">
                                <option value="">Cargo*</option>
                                <option value="Gerente">Gerente / Socio</option>
                                <option value="Administrador">Administrador</option>
                                <option value="RRHH">Recursos Humanos</option>
                                <option value="Otro">Otro</option>
                            </select>

                            <select id="tamano_empresa" name="tamano_empresa" value={formData.tamano_empresa} onChange={handleChange} required 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 cursor-pointer text-gray-600">
                                <option value="">Tamaño de empresa*</option>
                                <option value="1 a 10">1 a 10 empleados</option>
                                <option value="11 a 100">11 a 100 empleados</option>
                                <option value="101 en adelante">Más de 100</option>
                            </select>
                        </div>

                        <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} rows="3" required placeholder="Cuéntanos brevemente tu caso o consulta*" 
                            className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-300 resize-none placeholder-gray-400" />

                        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm mt-1">
                            <p className="text-xs text-gray-500 text-justify leading-relaxed">
                                Autorizo a LEGAL 360 S.A.S. para el tratamiento de mis datos personales, envío de respuestas, publicidad, invitaciones a eventos y encuestas a través de este medio.
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-6 font-medium text-[#001e33]">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" name="autorizacion" value="si" checked={formData.autorizacion === 'si'} onChange={handleChange} required 
                                        className="w-4 h-4 text-[#d4af37] bg-gray-100 border-gray-300 focus:ring-[#d4af37] cursor-pointer" />
                                    <span className="group-hover:text-[#d4af37] transition-colors">Sí, autorizo</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="radio" name="autorizacion" value="no" checked={formData.autorizacion === 'no'} onChange={handleChange} required 
                                        className="w-4 h-4 text-[#d4af37] bg-gray-100 border-gray-300 focus:ring-[#d4af37] cursor-pointer" />
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
                            className={`w-full mt-3 font-montserrat font-bold py-4 rounded-xl text-sm tracking-widest shadow-lg transform active:scale-95 transition-all duration-300 uppercase
                                ${(isLoading || formData.autorizacion === 'no') 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                                    : 'bg-[#001e33] hover:bg-[#062c54] text-[#e6d769] hover:shadow-[0_10px_20px_rgba(0,30,51,0.3)] hover:-translate-y-1'
                                }`}
                        >
                            {isLoading ? 'Procesando...' : 'Solicitar Diagnóstico'}
                        </button>
                    </form>
                </div>
            </div>

            {/* ================= MITAD DERECHA: TARJETA DE PLANES (Corregido Responsive) ================= */}
            {/* p-0 en móvil elimina los bordes blancos laterales */}
            <div className="w-full lg:w-[55%] xl:w-7/12 p-0 lg:p-4 sm:lg:p-6 lg:p-8 flex">
                
                {/* rounded-none en móvil para que la imagen cubra todo el ancho */}
                <div className="relative w-full h-full min-h-[600px] lg:min-h-full rounded-none lg:rounded-[2.5rem] overflow-hidden shadow-none lg:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-center items-center px-6 sm:px-12 py-20 lg:py-16 isolate">
                    
                    {/* Fondo de Imagen */}
                    <div className="absolute inset-0 z-[-2]">
                        <img 
                            src={bustos} 
                            alt="Abogados Legal 360" 
                            loading="lazy"
                            className="w-full h-full object-cover transform-gpu will-change-transform"
                        />
                        <div className="absolute inset-0 bg-[#001e33]/85 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c111b] via-[#001e33]/40 to-[#001e33]/80"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-2xl">
                        <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-[#fcd34d] text-center font-montserrat flex items-center justify-center gap-4 drop-shadow-lg">
                            <SolutionOutlined className="text-4xl" />
                            Nuestros Planes
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-white/15 hover:border-[#e6d769]/50 hover:-translate-y-1 transition-all duration-300">
                                <h4 className="text-xl font-bold mb-3 text-white text-center font-montserrat uppercase tracking-widest text-[#e6d769]">Plan Mensual</h4>
                                <p className="text-xs text-gray-300 text-center mb-6 font-light">Ideal para el respaldo jurídico continuo de tu empresa.</p>
                                <ul className="space-y-3 text-sm text-gray-200 font-roboto">
                                    <li className="flex items-start gap-3"><CheckCircleOutlined className="mt-0.5 text-[#e6d769]" />Acompañamiento en laboral, comercial y SST.</li>
                                    <li className="flex items-start gap-3"><PhoneOutlined className="mt-0.5 text-[#e6d769]" />Consultas ilimitadas multicanal.</li>
                                    <li className="flex items-start gap-3"><FileTextOutlined className="mt-0.5 text-[#e6d769]" />Revisión y elaboración documental.</li>
                                    <li className="flex items-start gap-3"><CheckCircleOutlined className="mt-0.5 text-[#e6d769]" />Gestión de riesgos y alertas legales.</li>
                                </ul>
                            </div>

                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-white/15 hover:border-[#e6d769]/50 hover:-translate-y-1 transition-all duration-300">
                                <h4 className="text-xl font-bold mb-3 text-white text-center font-montserrat uppercase tracking-widest text-[#e6d769]">Por Evento</h4>
                                <p className="text-xs text-gray-300 text-center mb-6 font-light">Apoyo jurídico puntual para casos específicos sin ataduras.</p>
                                <ul className="space-y-3 text-sm text-gray-200 font-roboto">
                                    <li className="flex items-start gap-3"><CheckCircleOutlined className="mt-0.5 text-[#e6d769]" />Asesoría especializada para tu caso.</li>
                                    <li className="flex items-start gap-3"><SolutionOutlined className="mt-0.5 text-[#e6d769]" />Estrategias de resultados inmediatos.</li>
                                    <li className="flex items-start gap-3"><FileTextOutlined className="mt-0.5 text-[#e6d769]" />Trámites, reclamaciones y auditorías.</li>
                                    <li className="flex items-start gap-3"><CalendarOutlined className="mt-0.5 text-[#e6d769]" />Sin compromisos mensuales, respuesta rápida.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <a
                                href="https://wa.link/twbzum"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] text-[#001e33] font-bold font-montserrat py-3 px-8 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                <CalendarOutlined className="text-xl" />
                                <span className="tracking-wider">AGENDA TU CITA</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioPlanes;