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
    FileTextOutlined
} from 'lucide-react';

const AVAILABLE_TAGS = [
    "Psicología", "Psicoterapia", "Ansiedad", "Depresión", "Estrés",
    "Estres laboral", "Trauma", "SST", "Riesgo psicosocial en el trabajo", "Manizales"
];

// Paleta Premium global
const goldColor = '#e6d769';

export default function BlogCRUD() {
    const [blogs, setBlogs] = useState([]);
    const [loadingList, setLoadingList] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [formData, setFormData] = useState({
        id: null,
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        status: "draft",
        tags: [],
        readTime: "",
        image: null, 
        isFeatured: false
    });
    
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef();

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

    const fetchBlogs = async () => {
        setLoadingList(true);
        try {
            const res = await axios.get('/api/blog/list');
            setBlogs(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            Swal.fire({ title: 'Error', text: 'No se pudieron cargar los blogs', icon: 'error', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor, customClass: { popup: 'premium-swal-popup' } });
        } finally {
            setLoadingList(false);
        }
    };

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
            if (currentTags.includes(tag)) {
                return { ...prev, tags: currentTags.filter((t) => t !== tag) };
            } else {
                return { ...prev, tags: [...currentTags, tag] };
            }
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

    const generateSlug = (text) => text.toLowerCase().trim().replace(/[^ña-z0-9\s-]/g, '').replace(/\s+/g, '-');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.content || formData.content === "<p><br></p>") {
            Swal.fire({ icon: 'warning', title: 'Falta contenido', text: 'El contenido no puede estar vacío.', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor, customClass: { popup: 'premium-swal-popup' } });
            return;
        }

        setLoadingSubmit(true);
        const data = new FormData();
        const slug = formData.slug.trim() || generateSlug(formData.title);
        
        data.append('title', formData.title);
        data.append('slug', slug);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        data.append('author', formData.author);
        data.append('status', formData.status);
        data.append('readTime', formData.readTime);
        data.append('isFeatured', formData.isFeatured);
        data.append('tags', JSON.stringify(formData.tags));

        if (formData.image instanceof File) {
            data.append('image', formData.image);
        }

        try {
            if (editMode) {
                await axios.put(`/api/blog/update/${formData.id}`, data);
                Swal.fire({ title: '¡Actualizado!', text: 'El artículo se guardó correctamente.', icon: 'success', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor, customClass: { popup: 'premium-swal-popup' } });
            } else {
                await axios.post('/api/blog/create', data);
                Swal.fire({ title: '¡Publicado!', text: 'El artículo fue creado correctamente.', icon: 'success', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor, customClass: { popup: 'premium-swal-popup' } });
            }
            cancelEdit();
            fetchBlogs();
        } catch (err) {
            const errorMsg = err?.response?.data?.message || 'Hubo un problema al guardar el blog';
            Swal.fire({ title: 'Error', text: errorMsg, icon: 'error', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor, customClass: { popup: 'premium-swal-popup' } });
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleEdit = (blog) => {
        let parsedTags = [];
        try {
            parsedTags = typeof blog.tags === 'string' ? JSON.parse(blog.tags) : (Array.isArray(blog.tags) ? blog.tags : []);
        } catch (e) {
            parsedTags = [];
        }

        setFormData({
            id: blog.id,
            title: blog.title || '',
            slug: blog.slug || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            author: blog.author || '',
            status: blog.status || 'draft',
            tags: parsedTags,
            readTime: blog.readTime || '',
            image: null,
            isFeatured: blog.isFeatured || false
        });
        setPreviewImage(blog.image_url || blog.image || null);
        setEditMode(true);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar artículo?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            background: '#0a1929',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: 'rgba(255,255,255,0.1)',
            confirmButtonText: '<span style="color:#ffffff; font-weight:600;">Sí, eliminar</span>',
            cancelButtonText: 'Cancelar',
            customClass: { popup: 'premium-swal-popup' }
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/blog/delete/${id}`);
                setBlogs(blogs.filter((b) => b.id !== id));
                Swal.fire({ title: 'Eliminado', text: 'El artículo ha sido eliminado.', icon: 'success', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor, customClass: { popup: 'premium-swal-popup' } });
            } catch (err) {
                Swal.fire({ title: 'Error', text: 'No se pudo eliminar el artículo.', icon: 'error', background: '#0a1929', color: '#ffffff', confirmButtonColor: goldColor, customClass: { popup: 'premium-swal-popup' } });
            }
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 premium-font text-gray-200">
            
            {/* ENCABEZADO */}
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight m-0">
                    Administrador de <span style={{ color: goldColor }}>Blog</span>
                </h2>
                <p className="text-gray-400 mt-2 font-light text-sm">Gestiona tus publicaciones, artículos y recursos.</p>
            </div>

            {/* SECCIÓN 1: LISTA DE BLOGS */}
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
                        <ul className="space-y-4">
                            {filteredBlogs.map(blog => (
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
                    )}
                </div>
            </div>

            {/* SECCIÓN 2: FORMULARIO */}
            <div className="mb-8 border-t border-white/10 pt-10">
                <h2 className="text-2xl font-semibold text-white tracking-tight mb-8">
                    {editMode ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
                </h2>
                
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
                                className="w-full text-sm text-[#e6d769] bg-black/20 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#e6d769] transition-colors placeholder:text-gray-600"
                                value={formData.slug}
                                onChange={handleChange}
                            />
                            <p className="text-[10px] text-gray-500 mt-2 m-0">Usa minúsculas y guiones. Déjalo en blanco para generarlo automáticamente.</p>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Resumen</label>
                            <textarea
                                name="excerpt"
                                rows={3}
                                placeholder="Un breve resumen que aparecerá en las tarjetas..."
                                className="w-full text-gray-300 bg-black/20 border border-white/10 rounded-lg px-4 py-3 resize-none outline-none focus:border-[#e6d769] transition-colors placeholder:text-gray-600"
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
                        
                        {/* Botón Destacado */}
                        <div 
                            onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                            className={`p-5 rounded-2xl cursor-pointer transition-all flex items-center justify-between group border ${
                            formData.isFeatured ? "bg-[#e6d769]/10 border-[#e6d769]/30" : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${formData.isFeatured ? "bg-[#e6d769]/20 text-[#e6d769]" : "bg-white/5 text-gray-500"}`}>
                                    <Star size={18} fill={formData.isFeatured ? "currentColor" : "none"} />
                                </div>
                                <div>
                                    <p className={`text-sm font-semibold m-0 ${formData.isFeatured ? "text-[#e6d769]" : "text-gray-300"}`}>Destacar Artículo</p>
                                    <p className="text-[10px] text-gray-500 m-0 mt-0.5">Aparecerá primero en el inicio</p>
                                </div>
                            </div>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.isFeatured ? "bg-[#e6d769]" : "bg-white/10"}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full shadow-sm transition-all duration-300 ${formData.isFeatured ? "left-6 bg-[#001e33]" : "left-1 bg-gray-400"}`} />
                            </div>
                        </div>

                        {/* Etiquetas y Metadatos */}
                        <div className="glass-panel p-6 rounded-2xl space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Etiquetas ({formData.tags.length})</label>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_TAGS.map((tag) => {
                                        const isSelected = formData.tags.includes(tag);
                                        return (
                                            <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 font-medium ${isSelected ? "bg-[#e6d769]/20 text-[#e6d769] border-[#e6d769]/50" : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"}`}>
                                                {isSelected && <Check size={12} />} {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tiempo de Lectura</label>
                                <input type="text" placeholder="Ej: 5 min" name="readTime" className="w-full premium-input px-4 py-2" value={formData.readTime} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Autor</label>
                                    <input type="text" name="author" placeholder="Nombre" className="w-full premium-input px-4 py-2" value={formData.author} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Estado</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full premium-input px-4 py-2">
                                        <option value="draft" className="bg-[#0a1929]">Borrador</option>
                                        <option value="published" className="bg-[#0a1929]">Publicado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Subida de Imagen */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Imagen Destacada</label>
                            <div className="relative w-full aspect-video bg-black/20 rounded-xl overflow-hidden border border-white/10 border-dashed flex flex-col items-center justify-center group transition-colors hover:bg-black/40">
                                {previewImage ? (
                                    <>
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-2 rounded-full text-red-400 hover:text-red-300 hover:bg-black/70 transition-all border border-white/10">
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="text-gray-500 mb-2 group-hover:text-[#e6d769] transition-colors" size={32} />
                                        <span className="text-xs text-gray-400 group-hover:text-gray-300 font-medium">Clic para subir imagen</span>
                                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="space-y-3 pt-4">
                            <button type="submit" disabled={loadingSubmit} className="w-full premium-btn-gold py-4 rounded-xl flex items-center justify-center gap-2 text-lg disabled:opacity-50">
                                {loadingSubmit ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                {editMode ? 'Guardar Cambios' : 'Publicar Artículo'}
                            </button>
                            
                            {editMode && (
                                <button type="button" onClick={cancelEdit} disabled={loadingSubmit} className="w-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                    <XCircle size={18} /> Cancelar Edición
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

                .premium-font { font-family: 'Montserrat', sans-serif; }

                /* Animación Fade In */
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }

                /* Glassmorphism */
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                /* Inputs */
                .premium-input {
                    background: rgba(0, 0, 0, 0.2) !important;
                    border: 1px solid rgba(255,255,255,0.08) !important;
                    color: white !important;
                    border-radius: 8px !important;
                    transition: all 0.3s ease !important;
                    outline: none;
                }
                .premium-input:focus, .premium-input:hover {
                    border-color: #e6d769 !important;
                    background: rgba(0, 0, 0, 0.4) !important;
                    box-shadow: 0 0 0 2px rgba(230, 215, 105, 0.1) !important;
                }

                /* Botón Dorado */
                .premium-btn-gold {
                    background: linear-gradient(135deg, #e6d769 0%, #d4af37 100%) !important;
                    color: #001e33 !important;
                    font-weight: 600 !important;
                    border: none !important;
                    box-shadow: 0 4px 15px rgba(230, 215, 105, 0.2) !important;
                    transition: all 0.3s ease !important;
                }
                .premium-btn-gold:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(230, 215, 105, 0.3) !important;
                    filter: brightness(1.1);
                }

                /* SweetAlert2 Premium */
                .premium-swal-popup {
                    border: 1px solid rgba(255,255,255,0.05) !important;
                    border-radius: 16px !important;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                    font-family: 'Montserrat', sans-serif;
                }

                /* --- CUSTOMIZACIÓN REACT QUILL PARA MODO OSCURO --- */
                .premium-quill-container .ql-toolbar { 
                    background: rgba(255, 255, 255, 0.03) !important; 
                    border-color: rgba(255, 255, 255, 0.1) !important; 
                    border-top-left-radius: 12px; 
                    border-top-right-radius: 12px; 
                    padding: 12px;
                }
                .premium-quill-container .ql-container { 
                    border-color: rgba(255, 255, 255, 0.1) !important; 
                    border-bottom-left-radius: 12px; 
                    border-bottom-right-radius: 12px; 
                    font-family: 'Montserrat', sans-serif; 
                    font-size: 1rem;
                    background: rgba(0, 0, 0, 0.2);
                }
                .premium-quill-container .ql-editor { 
                    color: #e5e7eb; /* Texto claro */
                    min-height: 300px;
                }
                .premium-quill-container .ql-editor::before {
                    color: rgba(255, 255, 255, 0.3) !important; /* Placeholder oscuro */
                }
                
                /* Colores de los iconos del editor */
                .premium-quill-container .ql-snow .ql-stroke { stroke: #9ca3af; }
                .premium-quill-container .ql-snow .ql-fill, 
                .premium-quill-container .ql-snow .ql-stroke.ql-fill { fill: #9ca3af; }
                
                /* Hover en los iconos del editor (Dorado) */
                .premium-quill-container .ql-snow.ql-toolbar button:hover .ql-stroke, 
                .premium-quill-container .ql-snow .ql-toolbar button:hover .ql-stroke,
                .premium-quill-container .ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #e6d769; }
                
                .premium-quill-container .ql-snow.ql-toolbar button:hover .ql-fill, 
                .premium-quill-container .ql-snow .ql-toolbar button:hover .ql-fill,
                .premium-quill-container .ql-snow.ql-toolbar button.ql-active .ql-fill { fill: #e6d769; }

                /* Dropdowns del editor (Encabezados) */
                .premium-quill-container .ql-snow .ql-picker { color: #9ca3af; }
                .premium-quill-container .ql-snow .ql-picker-options { 
                    background-color: #0a1929; 
                    border: 1px solid rgba(255,255,255,0.1); 
                    border-radius: 8px;
                    padding: 8px;
                }
                .premium-quill-container .ql-snow .ql-picker-item { color: #e5e7eb; }
                .premium-quill-container .ql-snow .ql-picker-item:hover { color: #e6d769; }
                
                /* Justificado de texto Quill */
                .ql-editor .ql-align-justify { text-align: justify; text-justify: inter-word; }
                .ql-editor li.ql-align-justify { text-align: justify; }
                .ql-editor .ql-indent-1 { padding-left: 3em; }
                .ql-editor .ql-indent-2 { padding-left: 6em; }
                .ql-editor .ql-indent-3 { padding-left: 9em; }
            `}} />
        </div>
    );
}