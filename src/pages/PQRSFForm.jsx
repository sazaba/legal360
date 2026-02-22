import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const PQRSFForm = () => {
    useEffect(() => window.scrollTo(0, 0), []);

    const [formData, setFormData] = useState({});
    const [confirmacionCorreo, setConfirmacionCorreo] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "confirmacion_correo") {
            setConfirmacionCorreo(value);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? (checked ? 1 : 0) : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.correo_electronico !== confirmacionCorreo) {
            Swal.fire("❌ Error", "El correo de confirmación no coincide", "error");
            return;
        }

        try {
            // Se envía directamente el objeto formData
            const payload = { ...formData };

            await axios.post("/api/pqrsf", payload);

            Swal.fire("✅ Solicitud enviada", "Gracias por comunicarte con nosotros", "success");
            e.target.reset();
            setFormData({});
            setConfirmacionCorreo("");

        } catch (error) {
            console.error(error);
            Swal.fire("❌ Error", "No se pudo enviar la solicitud", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white w-full lg:w-[55%] p-6 sm:p-8 border border-gray-200 grid grid-cols-1 gap-4 text-[#001e33] text-sm font-medium">
            <h2 className="text-2xl font-bold text-center py-4 text-[#001e33]">Formulario PQRSF</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select name="tipo_documento" onChange={handleChange} className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required>
                    <option value="">Tipo de Documento</option>
                    <option value="CC">C.C</option>
                    <option value="CE">C.E.</option>
                    <option value="PEP">P.E.P.</option>
                    <option value="TI">T.I</option>
                    <option value="NIT">NIT</option>
                </select>
                <input name="numero_documento" type="text" placeholder="Número de Documento*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="nombres" type="text" placeholder="Nombre(s) del peticionario*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required onChange={handleChange} />
                <input name="apellidos" type="text" placeholder="Apellido(s) del peticionario*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required onChange={handleChange} />
            </div>

            <input name="correo_electronico" type="email" placeholder="Correo electrónico de notificación del peticionario*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required onChange={handleChange} />
            <input name="confirmacion_correo" type="email" placeholder="Confirmación correo electrónico *" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required onChange={handleChange} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="telefono_principal" type="tel" placeholder="Teléfono de contacto *" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required onChange={handleChange} />
                <input name="telefono_adicional" type="tel" placeholder="Teléfono adicional" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" onChange={handleChange} />
            </div>

            <fieldset className="space-y-2">
                <legend className="block mb-2">Objeto de la solicitud *</legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"].map((item) => (
                        <label key={item} className="flex items-center gap-2">
                            <input type="radio" name="objeto" value={item} className="accent-[#001e33] w-4 h-4" required onChange={handleChange} />
                            {item}
                        </label>
                    ))}
                </div>
            </fieldset>

            <div>
                <textarea
                    name="descripcion"
                    rows="6"
                    maxLength="2000"
                    placeholder="Hechos en los que se fundamenta la petición, solicitud, queja / reclamo o recurso *"
                    className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                    onChange={handleChange}
                ></textarea>
                <p className="text-xs text-gray-500 mt-1 text-justify">Máximo 2.000 caracteres.</p>
            </div>

            <div className="flex items-start gap-2">
                <input name="autorizacion_datos" type="checkbox" required className="mt-1 accent-[#e6d769]" onChange={handleChange} />
                <label className="text-gray-700 leading-snug text-justify">
                    He leído y autorizo a LEGAL 360 S.A.S., para tratar mis datos según la {" "}
                    <Link to="/politica-datos" className="text-blue-600 underline font-medium">
                        Política de Tratamiento de Datos Personales
                    </Link>.
                </label>
            </div>

            <button type="submit" className="w-full bg-[#001e33] hover:bg-[#0b2a4d] text-white py-2 rounded-md font-semibold">
                Enviar solicitud
            </button>
        </form>
    );
};

export default PQRSFForm;