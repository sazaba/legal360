import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { supabase } from '../supabaseClient';


const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 2;

const PQRSFForm = () => {
    useEffect(() => window.scrollTo(0, 0), []);

    const fileInputRef = useRef();
    const [formData, setFormData] = useState({});
    const [confirmacionCorreo, setConfirmacionCorreo] = useState("");
    const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);

    const handleFileClick = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        const nuevosArchivos = Array.from(e.target.files);
        const archivosValidos = [];
        const extensionesPermitidas = ['pdf'];

        for (let archivo of nuevosArchivos) {
            const extension = archivo.name.split('.').pop().toLowerCase();
            const esPDF = extensionesPermitidas.includes(extension);
            const esTamanioValido = archivo.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

            if (!esPDF) {
                Swal.fire("⚠️ Archivo inválido", `El archivo "${archivo.name}" no es un PDF`, "warning");
                continue;
            }

            if (!esTamanioValido) {
                Swal.fire("⚠️ Tamaño excedido", `El archivo "${archivo.name}" supera los 2MB`, "warning");
                continue;
            }

            archivosValidos.push(archivo);
        }

        const total = archivosSeleccionados.length + archivosValidos.length;
        if (total > MAX_FILES) {
            Swal.fire("⚠️ Límite excedido", "Solo puedes adjuntar hasta 5 archivos en total", "warning");
            return;
        }

        setArchivosSeleccionados((prev) => [...prev, ...archivosValidos]);
    };

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
            // 1. Subir los archivos a Supabase Storage
            const urls = [];
            for (const archivo of archivosSeleccionados) {
                const nombreUnico = `${Date.now()}-${archivo.name}`;
                const { error: uploadError } = await supabase.storage.from('legal360pdf').upload(nombreUnico, archivo);
                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('legal360pdf').getPublicUrl(nombreUnico);
                urls.push(data.publicUrl);
            }

            // 2. Crear el cuerpo con datos y URLs de los archivos
            const payload = {
                ...formData,
                archivos: urls
            };

            await axios.post("/api/pqrsf", payload);

            Swal.fire("✅ Solicitud enviada", "Gracias por comunicarte con nosotros", "success");
            e.target.reset();
            setFormData({});
            setConfirmacionCorreo("");
            setArchivosSeleccionados([]);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (error) {
            console.error(error);
            Swal.fire("❌ Error", "No se pudo enviar la solicitud", "error");
        }
    };

    const eliminarArchivo = (index) => {
        setArchivosSeleccionados(prev => prev.filter((_, i) => i !== index));
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
                <p className="text-xs text-gray-500 mt-1 text-justify">Máximo 2.000 caracteres. Si requiere enviar más información, adjunte un archivo.</p>
            </div>

            <div>
                <label className="block mb-1 text-justify">Documentos anexos: (Selecciona los archivos y adjúntalos con el botón "Adjuntar")</label>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={handleFileClick} className="flex items-center justify-center gap-2 bg-gray-300 text-gray-600 py-2 rounded-md px-4">
                        <AiOutlinePaperClip className="text-base" /> <span>Adjuntar</span>
                    </button>
                    {archivosSeleccionados.length > 0 && <BsFillFileEarmarkCheckFill className="text-green-500 text-xl" title="Archivos listos para enviar" />}
                </div>
                <input ref={fileInputRef} type="file" multiple accept=".pdf" className="hidden" onChange={handleFileChange} />
                {archivosSeleccionados.length > 0 && (
                    <ul className="mt-2 text-xs text-green-600 list-disc pl-5">
                        {archivosSeleccionados.map((file, idx) => (
                            <li key={idx} className="flex justify-between items-center">
                                {file.name}
                                <button type="button" className="ml-2 text-red-600 text-xs" onClick={() => eliminarArchivo(idx)}>
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <p className="text-xs text-gray-500 mt-1 text-justify">Máximo 5 archivos. Cada uno no debe superar los 2MB. Solo formato PDF.</p>
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
