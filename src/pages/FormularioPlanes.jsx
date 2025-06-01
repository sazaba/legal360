import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
    SolutionOutlined,
    FileTextOutlined,
    PhoneOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
} from "@ant-design/icons";

const FormularioPlanes = () => {
    const form = useRef();
    const [enviado, setEnviado] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_z8guij6",
                "template_c8msv7q",
                form.current,
                "xg_0dv3Hbof0dI54N"
            )
            .then(() => {
                setEnviado(true);
                form.current.reset();
            })
            .catch((error) => {
                console.error("Error al enviar:", error);
                alert("❌ Hubo un error al enviar el formulario.");
            });
    };

    return (
        <section className="min-h-[80vh] bg-gradient-to-br from-white to-gray-100 flex justify-center px-4 sm:px-6 py-8 font-sans">
            <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden">
                {/* Formulario compacto */}
                <div className="bg-white w-full md:w-1/2 p-6 sm:p-8 border border-gray-200">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#001e33] mb-4 text-center sm:text-center">
                        Agenda tu Diagnóstico Gratuito
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2 mb-4">
                        Si usted es una persona jurídica o empresa y requiere conocer cuál es su estado jurídico en materia de derecho laboral y comercial, diligencie la siguiente información.
                    </p>

                    <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 gap-3 text-[#001e33] text-sm">
                        <div className="grid grid-cols-2 gap-3">
                            <input name="nombre" required placeholder="Nombre*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2" />
                            <input name="apellido" required placeholder="Apellido*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <input name="email" type="email" required placeholder="Correo electrónico*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2" />

                        <div className="flex gap-2">
                            <select name="pais" required className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-1/3">
                                <option value="Colombia">Col</option>
                            </select>
                            <input name="telefono" required placeholder="+57" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-2/3" />
                        </div>

                        <select name="cargo" required className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2">
                            <option value="">Cargo*</option>
                            <option value="Gerente">Gerente/Fundador/Socio</option>
                            <option value="Administrador">Administrador/Contador</option>
                            <option value="RRHH">Recursos Humanos</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <select name="tamaño_empresa" required className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2">
                            <option value="">Tamaño de empresa*</option>
                            <option value="1 a 10">1 a 10</option>
                            <option value="11 a 100">11 a 100 empleados</option>
                            <option value="101 en adelante">101 en adelante</option>
                        </select>

                        <select name="legalmente_constituida" required className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2">
                            <option value="">¿Constituida legalmente?*</option>
                            <option value="Sí">Sí</option>
                            <option value="No">No</option>
                        </select>

                        <textarea
                            name="mensaje"
                            rows="3"
                            required
                            placeholder="Mensaje o consulta"
                            className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2"
                        />

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                name="autorizacion"
                                required
                                className="mt-1 accent-[#e6d769]"
                            />
                            <label className="text-xs text-gray-700 leading-snug">
                                En cumplimiento de la Ley 1581 de 2012 y sus decretos reglamentarios,
                                autorizo el tratamiento de mis datos personales a <strong>Legal 360 S.A.S.</strong>,
                                con el propósito de cumplir el desarrollo de actividades afines a su objeto social
                                de conformidad con la Ley, de acuerdo con su Política de Protección de Datos Personales.*
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#001e33] hover:bg-[#0b2a4d] text-white font-semibold py-2 rounded-md text-sm"
                        >
                            Enviar
                        </button>

                        {enviado && (
                            <p className="text-green-600 text-sm text-center pt-1">
                                ✅ ¡Muchas gracias! Lo estaremos contactando.
                            </p>
                        )}
                    </form>
                </div>

                <div className="bg-[#001e33] w-full md:w-1/2 text-white p-8 flex flex-col justify-center items-center text-center">
                    <div className="max-w-3xl w-full">
                        <h3 className="text-3xl font-bold mb-8 text-[#fcd34d] text-center flex items-center justify-center gap-3">
                            <SolutionOutlined className="text-4xl" />
                            Planes de Asesoría Legal
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                            {/* Plan Mensual */}
                            <div className="bg-white text-[#1d1d1b] p-6 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300">
                                <h4 className="text-xl font-bold mb-4 flex flex-col items-center justify-center gap-2 text-center">
                                    <FileTextOutlined className="text-lg text-[#001e33]" />
                                    Plan Mensual
                                </h4>
                                <p className="text-sm mb-4">
                                    Ideal para empresas que requieren un respaldo jurídico preventivo.
                                </p>
                                <ul className="mt-3 list-none space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircleOutlined className="mt-1 text-[#001e33]" />
                                        Acompañamiento legal continuo en derecho laboral y comercial.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <PhoneOutlined className="mt-1 text-[#001e33]" />
                                        Consultas jurídicas ilimitadas por correo, teléfono o videollamada.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FileTextOutlined className="mt-1 text-[#001e33]" />
                                        Revisión y elaboración de documentos legales.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircleOutlined className="mt-1 text-[#001e33]" />
                                        Alerta de vencimientos legales y gestión de riesgos jurídicos.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <SolutionOutlined className="mt-1 text-[#001e33]" />
                                        Capacitaciones jurídicas a tu equipo.
                                    </li>
                                </ul>
                            </div>

                            {/* Servicio por Evento */}
                            <div className="bg-white text-[#1d1d1b] p-6 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300">
                                <h4 className="text-xl font-bold mb-4 flex flex-col items-center justify-center gap-2 text-center">
                                    <CalendarOutlined className="text-lg text-[#001e33]" />
                                    Servicios por Evento
                                </h4>
                                <p className="text-sm mb-4">
                                    Para empresas que requieren apoyo jurídico puntual en casos específicos.
                                </p>
                                <ul className="mt-3 list-none space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircleOutlined className="mt-1 text-[#001e33]" />
                                        Asesoría especializada para un caso o situación puntual.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <SolutionOutlined className="mt-1 text-[#001e33]" />
                                        Estrategias jurídicas enfocadas en resultados inmediatos.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FileTextOutlined className="mt-1 text-[#001e33]" />
                                        Gestión en trámites, reclamaciones, inspecciones o conflictos.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircleOutlined className="mt-1 text-[#001e33]" />
                                        No requiere compromiso mensual.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CalendarOutlined className="mt-1 text-[#001e33]" />
                                        Tiempo de respuesta prioritario según disponibilidad.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p
                            className="mt-8 text-sm sm:text-base font-semibold text-[#1d1d1b] px-4 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 inline-block"
                            style={{
                                background: "linear-gradient(135deg, #d4af37 0%, #f5e27a 50%, #d4af37 100%)",
                            }}
                        >
                            <CalendarOutlined className="mr-2 text-lg align-middle" />
                            AGENDA <br />TU PRIMERA CONSULTA
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FormularioPlanes;
