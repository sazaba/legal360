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
    TeamOutlined,
    AuditOutlined,
    BellOutlined,
    ThunderboltOutlined,
    ClockCircleOutlined
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
        // lg:h-screen asegura que en desktop todo encaje en una sola vista
        <section className="relative w-full min-h-[100svh] lg:h-screen flex flex-col lg:flex-row bg-[#f8fafc] overflow-hidden isolate">
            
            {/* ================= MITAD IZQUIERDA: FORMULARIO ================= */}
            {/* Ajuste de paddings lg:py-8 para compactar verticalmente */}
            <div className="w-full lg:w-[45%] xl:w-5/12 px-6 sm:px-12 lg:px-16 py-12 lg:py-8 flex flex-col justify-center overflow-y-auto">
                <div className="max-w-xl mx-auto w-full">
                    <div className="mb-6 lg:mb-4 text-center lg:text-left">
                        <h2 className="text-3xl lg:text-3xl xl:text-4xl font-extrabold text-[#001e33] font-montserrat mb-2 tracking-tight">
                            Agenda tu <br className="hidden lg:block"/>
                            <span className="text-[#001e33]">Diagnóstico Gratuito</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 font-roboto leading-snug">
                            Si usted es una persona jurídica o natural y requiere conocer cuál es su estado jurídico en materia derecho laboral y comercial, diligencie la siguiente información.
                        </p>
                    </div>

                    {/* Gap reducido en desktop para ahorrar espacio */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-3 text-[#001e33] text-sm font-roboto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                            <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Nombre*" 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] transition-all placeholder-gray-400" />
                            <input id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required placeholder="Apellido*" 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] transition-all placeholder-gray-400" />
                        </div>

                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Correo electrónico*" 
                            className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] transition-all placeholder-gray-400" />

                        <div className="flex gap-3">
                            <select id="pais" name="pais" value={formData.pais} onChange={handleChange} required 
                                className="w-1/3 bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] cursor-pointer text-gray-600">
                                <option value="Col">Col (+57)</option>
                            </select>
                            <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="+57" 
                                className="w-2/3 bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] transition-all placeholder-gray-400" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                            <select id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] cursor-pointer text-gray-600 text-xs">
                                <option value="">Cargo*</option>
                                <option value="Gerente">Gerente / Socio</option>
                                <option value="Administrador">Administrador</option>
                                <option value="RRHH">Recursos Humanos</option>
                                <option value="Otro">Otro</option>
                            </select>

                            <select id="tamano_empresa" name="tamano_empresa" value={formData.tamano_empresa} onChange={handleChange} required 
                                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] cursor-pointer text-gray-600 text-xs">
                                <option value="">Tamaño de empresa*</option>
                                <option value="1 a 10">1 a 10 empleados</option>
                                <option value="11 a 100">11 a 100 empleados</option>
                                <option value="101 en adelante">Más de 100</option>
                            </select>
                        </div>

                        <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} rows="2" placeholder="Mensaje o consulta" 
                            className="w-full bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#d4af37] resize-none placeholder-gray-400 text-xs" />

                        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
                            <p className="text-[10px] text-gray-500 text-justify leading-tight">
                                En virtud de lo anterior, autorizo o no autorizo a LEGAL 360 S.A.S., para que realice tratamiento de mis datos personales y emita respuesta a inquietudes...
                            </p>
                            
                            <div className="flex items-center gap-6 font-medium text-[#001e33] text-[11px]">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="autorizacion" value="si" checked={formData.autorizacion === 'si'} onChange={handleChange} required 
                                        className="w-3.5 h-3.5 text-[#d4af37] focus:ring-[#d4af37] cursor-pointer" />
                                    <span>Autorizo</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="autorizacion" value="no" checked={formData.autorizacion === 'no'} onChange={handleChange} required 
                                        className="w-3.5 h-3.5 text-[#d4af37] focus:ring-[#d4af37] cursor-pointer" />
                                    <span>No autorizo</span>
                                </label>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className={`w-full font-montserrat font-bold py-3.5 rounded-xl text-xs tracking-widest shadow-lg transform active:scale-95 transition-all duration-300 uppercase
                                ${isLoading 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'bg-[#001e33] hover:bg-[#062c54] text-white'
                                }`}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                </div>
            </div>

            {/* ================= MITAD DERECHA: TARJETA DE PLANES ================= */}
            {/* lg:p-6 y flex-col justify-center para centrar las tarjetas en el viewport */}
            <div className="w-full lg:w-[55%] xl:w-7/12 p-0 lg:p-6 xl:p-10 flex">
                <div className="relative w-full h-full min-h-[500px] rounded-none lg:rounded-[3rem] overflow-hidden flex flex-col justify-center items-center px-6 sm:px-12 py-12 lg:py-6 isolate">
                    
                    {/* Fondo de Imagen */}
                    <div className="absolute inset-0 z-[-2]">
                        <img src={bustos} alt="Fondo Legal" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#001e33]/90 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001e33] via-transparent to-[#001e33]/50"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-3xl">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-[#fcd34d] text-center font-montserrat flex items-center justify-center gap-4">
                            <SolutionOutlined className="text-[#fcd34d]" />
                            Planes de Asesoría Legal
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
                            {/* Plan Mensual - Compactado lg:p-5 */}
                            <div className="bg-white p-6 lg:p-5 xl:p-8 rounded-[2rem] shadow-2xl flex flex-col h-full border border-gray-100">
                                <h4 className="text-lg font-bold mb-1 text-[#001e33] text-center font-montserrat">Plan Mensual</h4>
                                <p className="text-[11px] text-gray-500 text-center mb-4 leading-tight">Ideal para empresas con respaldo preventivo.</p>
                                <ul className="space-y-2.5 xl:space-y-4 text-[12px] text-[#001e33] font-roboto flex-grow">
                                    <li className="flex items-start gap-2 leading-tight"><CheckCircleOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Acompañamiento en laboral, comercial y SST.</li>
                                    <li className="flex items-start gap-2 leading-tight"><PhoneOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Consultas ilimitadas (WA, Tel, Email).</li>
                                    <li className="flex items-start gap-2 leading-tight"><FileTextOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Revisión y elaboración documental.</li>
                                    <li className="flex items-start gap-2 leading-tight"><BellOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Alertas legales y gestión de riesgos.</li>
                                    <li className="flex items-start gap-2 leading-tight"><TeamOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Capacitaciones a tu equipo.</li>
                                </ul>
                            </div>

                            {/* Servicios por Evento - Compactado lg:p-5 */}
                            <div className="bg-white p-6 lg:p-5 xl:p-8 rounded-[2rem] shadow-2xl flex flex-col h-full border border-gray-100">
                                <h4 className="text-lg font-bold mb-1 text-[#001e33] text-center font-montserrat">Por Evento</h4>
                                <p className="text-[11px] text-gray-500 text-center mb-4 leading-tight">Apoyo jurídico puntual en casos específicos.</p>
                                <ul className="space-y-2.5 xl:space-y-4 text-[12px] text-[#001e33] font-roboto flex-grow">
                                    <li className="flex items-start gap-2 leading-tight"><CheckCircleOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Asesoría especializada para casos puntuales.</li>
                                    <li className="flex items-start gap-2 leading-tight"><ThunderboltOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Estrategias de resultados inmediatos.</li>
                                    <li className="flex items-start gap-2 leading-tight"><AuditOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Trámites, reclamaciones y auditorías.</li>
                                    <li className="flex items-start gap-2 leading-tight"><CheckCircleOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Sin compromiso mensual.</li>
                                    <li className="flex items-start gap-2 leading-tight"><ClockCircleOutlined className="mt-0.5 text-[#001e33] flex-shrink-0" /> Respuesta prioritaria según disponibilidad.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Botón final con margen reducido en desktop */}
                        <div className="mt-8 lg:mt-6 flex justify-center">
                            <button className="inline-flex items-center gap-3 bg-[#e6ce5a] text-[#001e33] font-bold font-montserrat py-3 xl:py-4 px-8 xl:px-10 rounded-xl shadow-xl hover:scale-105 transition-all duration-300 text-xs tracking-tight">
                                <CalendarOutlined className="text-lg" />
                                <span>AGENDA TU PRIMERA CONSULTA</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioPlanes;