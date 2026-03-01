import React, { useEffect, useState, useMemo, useRef } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
    Save,
    Loader2,
    UploadCloud,
    X,
    Check,
    Star,
    Trash2,
    Link as LinkIcon,
    Edit3,
    XCircle,
    ChevronLeft,
    ChevronRight,
    PlusCircle
} from 'lucide-react';

const AVAILABLE_TAGS = [
    "Derecho Laboral", "Derecho Comercial", "Seguridad Social", "Pensiones", "SST",
    "Riesgos Laborales", "Contratos", "Creación de Sociedades", "Asesoría Empresarial",
    "Gestión del Talento", "Liquidaciones", "Prevención Legal", "Actualidad Jurídica", "Pereira"
];

const goldColor = '#e6d769';

export default function BlogCRUD() {
    const [blogs, setBlogs] = useState([]);
    const [loadingList, setLoadingList] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // --- LÓGICA DE PAGINACIÓN ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    
    const [formData, setFormData] = useState({
        id: null, title: "", slug: "", excerpt: "", content: "",
        author: "", status: "draft", tags: [], readTime: "",
        image: null, isFeatured: false
    });
    
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef();
    const formRef = useRef(null); // Ref para el scroll automático al formulario

    // --- CONFIGURACIÓN DE QUILL (INTACTA) ---
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'clean']
        ],
        clipboard: {
            matchVisual: false,
            matchers: [
                [1, (node, delta) => {
                    delta.ops = delta.ops.map((op) => {
                        if (!op.attributes) return op;
                        const allowedAttributes = ['bold', 'italic', 'underline', 'strike', 'header', 'list', 'indent', 'link', 'align', 'blockquote'];
                        const newAttributes = {};
                        allowedAttributes.forEach(attr => {
                            if (op.attributes[attr]) {
                                newAttributes[attr] = op.attributes[attr];
                            }
                        });
                        return { insert: op.insert, attributes: newAttributes };
                    });
                    return delta;
                }]
            ]
        }
    }), []);

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Volver a la página 1 si se realiza una búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const fetchBlogs = async () => {
        setLoadingList(true);
        try {
            const res = await axios.get('/api/blog/list');
            setBlogs(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            Swal.fire({ title: 'Error', text: 'No se pudieron cargar los blogs', icon: 'error', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor });
        } finally {
            setLoadingList(false);
        }
    };

    // --- FILTRADO Y CÁLCULO DE PAGINACIÓN ---
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditorChange = (value) => {
        setFormData((prev) => ({ ...prev, content: value }));
    };

    const toggleTag = (tag) => {
        setFormData((prev) => {
            const currentTags = prev.tags;
            return currentTags.includes(tag) 
                ? { ...prev, tags: currentTags.filter((t) => t !== tag) }
                : { ...prev, tags: [...currentTags, tag] };
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setFormData({ ...formData, image: null });
        setPreviewImage(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const cancelEdit = () => {
        setFormData({
            id: null, title: '', slug: '', excerpt: '', content: '', author: '',
            status: 'draft', tags: [], readTime: '', image: null, isFeatured: false
        });
        setPreviewImage(null);
        setEditMode(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.content || formData.content === "<p><br></p>") {
            Swal.fire({ icon: 'warning', title: 'Falta contenido', text: 'El contenido no puede estar vacío.', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor });
            return;
        }

        setLoadingSubmit(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'tags') data.append(key, JSON.stringify(formData[key]));
            else if (key === 'image') { if(formData[key] instanceof File) data.append(key, formData[key]); }
            else data.append(key, formData[key]);
        });

        try {
            if (editMode) await axios.put(`/api/blog/update/${formData.id}`, data);
            else await axios.post('/api/blog/create', data);
            
            Swal.fire({ title: 'Éxito', text: 'Operación completada', icon: 'success', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor });
            cancelEdit();
            fetchBlogs();
        } catch (err) {
            Swal.fire({ title: 'Error', text: 'Hubo un problema al guardar', icon: 'error', background: '#0a1929', color: '#ffffff' });
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleEdit = (blog) => {
        let parsedTags = [];
        try {
            parsedTags = typeof blog.tags === 'string' ? JSON.parse(blog.tags) : (Array.isArray(blog.tags) ? blog.tags : []);
        } catch (e) { parsedTags = []; }

        setFormData({ ...blog, tags: parsedTags, image: null });
        setPreviewImage(blog.image_url || blog.image || null);
        setEditMode(true);
        // Scroll suave al formulario
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({ title: '¿Eliminar artículo?', text: "No podrás revertir esto.", icon: 'warning', showCancelButton: true, background: '#0a1929', color: '#ffffff', confirmButtonColor: '#e11d48' });
        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/blog/delete/${id}`);
                fetchBlogs();
                Swal.fire({ title: 'Eliminado', icon: 'success', background: '#0a1929', color: '#ffffff' });
            } catch (err) {
                Swal.fire({ title: 'Error', text: 'No se pudo eliminar', icon: 'error' });
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 premium-font text-gray-200">
            
            {/* ENCABEZADO */}
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight m-0">
                        Administrador de <span style={{ color: goldColor }}>Blog</span>
                    </h2>
                    <p className="text-gray-400 mt-2 font-light text-sm">Gestiona tus publicaciones, artículos y recursos.</p>
                </div>
                {!editMode && (
                    <button 
                        onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="hidden md:flex items-center gap-2 text-xs font-bold text-[#e6d769] hover:text-white transition-colors"
                    >
                        <PlusCircle size={18} /> NUEVO ARTÍCULO
                    </button>
                )}
            </div>

            {/* SECCIÓN 1: LISTA DE BLOGS CON PAGINACIÓN */}
            <div className="mb-16">
                <div className="glass-panel p-6 rounded-2xl animate-fade-in-up">
                    <input 
                        type="text" 
                        placeholder="Buscar por título o autor..." 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        className="w-full mb-6 premium-input px-4 py-3" 
                    />
                    
                    {loadingList ? (
                        <div className="flex justify-center py-8 text-[#e6d769]"><Loader2 className="animate-spin" size={32} /></div>
                    ) : filteredBlogs.length === 0 ? (
                        <p className="text-gray-500 text-center py-8 font-light">No hay publicaciones existentes.</p>
                    ) : (
                        <>
                            <ul className="space-y-4">
                                {currentItems.map(blog => (
                                    <li key={blog.id} className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/[0.04] transition-all group">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-lg font-semibold text-gray-100 m-0">{blog.title}</h4>
                                                {blog.isFeatured && <Star size={14} className="text-[#e6d769]" fill="currentColor" />}
                                            </div>
                                            <p className="text-xs font-light text-gray-400 m-0 mt-1">
                                                <span className="text-gray-300 font-medium">{blog.author || 'Anónimo'}</span> • Estado: <span className="uppercase tracking-widest text-[#e6d769]">{blog.status}</span>
                                            </p>
                                        </div>
                                        <div className="flex gap-2 w-full md:w-auto mt-3 md:mt-0">
                                            <button onClick={() => handleEdit(blog)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-black/20 border border-white/10 hover:border-[#e6d769]/50 text-gray-300 hover:text-[#e6d769] px-4 py-2 rounded-lg transition-all text-sm">
                                                <Edit3 size={16} /> Editar
                                            </button>
                                            <button onClick={() => handleDelete(blog.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-all text-sm">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* CONTROLES DE PAGINACIÓN */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/5">
                                    <button 
                                        disabled={currentPage === 1}
                                        onClick={() => paginate(currentPage - 1)}
                                        className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-20 transition-all text-gray-400"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    
                                    <div className="flex gap-2">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => paginate(i + 1)}
                                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-[#e6d769] text-[#001e33]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        disabled={currentPage === totalPages}
                                        onClick={() => paginate(currentPage + 1)}
                                        className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-20 transition-all text-gray-400"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* SECCIÓN 2: FORMULARIO (Scroll destino) */}
            <div ref={formRef} className="mb-8 border-t border-white/10 pt-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-white tracking-tight">
                        {editMode ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
                    </h2>
                    {editMode && (
                         <button onClick={cancelEdit} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-bold">
                            <XCircle size={14} /> CANCELAR EDICIÓN
                         </button>
                    )}
                </div>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* COLUMNA IZQUIERDA */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel p-6 rounded-2xl">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Título</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full text-xl md:text-2xl font-semibold text-white bg-transparent border-b border-white/10 focus:border-[#e6d769] pb-2 transition-colors outline-none placeholder:text-gray-600"
                                placeholder="Escribe el título aquí..."
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <div className="flex items-center gap-2 mb-3">
                                <LinkIcon size={14} className="text-[#e6d769]" />
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">URL del Artículo (Slug)</label>
                            </div>
                            <input
                                type="text"
                                name="slug"
                                placeholder="ej: como-superar-la-ansiedad"
                                className="w-full text-sm text-[#e6d769] bg-black/20 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#e6d769] transition-colors"
                                value={formData.slug}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Resumen</label>
                            <textarea
                                name="excerpt"
                                rows={3}
                                placeholder="Un breve resumen..."
                                className="w-full text-gray-300 bg-black/20 border border-white/10 rounded-lg px-4 py-3 resize-none outline-none focus:border-[#e6d769]"
                                value={formData.excerpt}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="glass-panel p-6 rounded-2xl min-h-[500px] flex flex-col">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-3">Contenido Principal</label>
                            <div className="flex-1 h-full flex flex-col premium-quill-container">
                                <ReactQuill 
                                    theme="snow" 
                                    value={formData.content} 
                                    onChange={handleEditorChange}
                                    modules={modules}
                                    className="h-full flex-1 mb-10 text-white" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="space-y-6">
                        <div 
                            onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                            className={`p-5 rounded-2xl cursor-pointer transition-all flex items-center justify-between group border ${
                            formData.isFeatured ? "bg-[#e6d769]/10 border-[#e6d769]/30" : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}>
                            <div className="flex items-center gap-3">
                                <Star size={18} fill={formData.isFeatured ? "currentColor" : "none"} className={formData.isFeatured ? "text-[#e6d769]" : "text-gray-500"} />
                                <div>
                                    <p className={`text-sm font-semibold m-0 ${formData.isFeatured ? "text-[#e6d769]" : "text-gray-300"}`}>Destacar Artículo</p>
                                </div>
                            </div>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.isFeatured ? "bg-[#e6d769]" : "bg-white/10"}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${formData.isFeatured ? "left-6 bg-[#001e33]" : "left-1 bg-gray-400"}`} />
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl space-y-5">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Etiquetas</label>
                            <div className="flex flex-wrap gap-2">
                                {AVAILABLE_TAGS.map((tag) => (
                                    <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`text-[10px] px-2 py-1 rounded-full border transition-all ${formData.tags.includes(tag) ? "bg-[#e6d769]/20 text-[#e6d769] border-[#e6d769]/50" : "bg-transparent text-gray-500 border-white/10"}`}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <input type="text" placeholder="Tiempo de lectura" name="readTime" className="w-full premium-input px-4 py-2" value={formData.readTime} onChange={handleChange} required />
                            <input type="text" placeholder="Autor" name="author" className="w-full premium-input px-4 py-2" value={formData.author} onChange={handleChange} />
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full premium-input px-4 py-2">
                                <option value="draft" className="bg-[#0a1929]">Borrador</option>
                                <option value="published" className="bg-[#0a1929]">Publicado</option>
                            </select>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                             <div className="relative w-full aspect-video bg-black/20 rounded-xl overflow-hidden border border-white/10 border-dashed flex flex-col items-center justify-center group transition-colors hover:bg-black/40">
                                {previewImage ? (
                                    <>
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-red-400 hover:text-red-300">
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="text-gray-500 mb-2 group-hover:text-[#e6d769]" size={32} />
                                        <span className="text-[10px] text-gray-400">Subir imagen</span>
                                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </>
                                )}
                            </div>
                        </div>

                        <button type="submit" disabled={loadingSubmit} className="w-full premium-btn-gold py-4 rounded-xl flex items-center justify-center gap-2 text-lg disabled:opacity-50">
                            {loadingSubmit ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            {editMode ? 'Guardar Cambios' : 'Publicar Artículo'}
                        </button>
                    </div>
                </form>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
                .premium-font { font-family: 'Montserrat', sans-serif; }
                .glass-panel { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .premium-input { background: rgba(0, 0, 0, 0.2) !important; border: 1px solid rgba(255,255,255,0.08) !important; color: white !important; border-radius: 8px !important; outline: none; transition: all 0.3s ease; }
                .premium-input:focus { border-color: #e6d769 !important; box-shadow: 0 0 0 2px rgba(230, 215, 105, 0.1) !important; }
                .premium-btn-gold { background: linear-gradient(135deg, #e6d769 0%, #d4af37 100%) !important; color: #001e33 !important; font-weight: 600 !important; border: none !important; box-shadow: 0 4px 15px rgba(230, 215, 105, 0.2) !important; transition: all 0.3s ease; }
                .premium-btn-gold:hover { transform: translateY(-2px); filter: brightness(1.1); }
                .premium-quill-container .ql-toolbar { background: rgba(255, 255, 255, 0.03) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; border-top-left-radius: 12px; border-top-right-radius: 12px; }
                .premium-quill-container .ql-container { border: 1px solid rgba(255, 255, 255, 0.1) !important; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; font-family: 'Montserrat', sans-serif; background: rgba(0, 0, 0, 0.2); }
                .premium-quill-container .ql-editor { color: #e5e7eb; min-height: 300px; }
                .premium-quill-container .ql-snow .ql-stroke { stroke: #9ca3af; }
                .premium-quill-container .ql-snow.ql-toolbar button:hover .ql-stroke, .premium-quill-container .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #e6d769; }
                .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}} />
        </div>
    );
}