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
    XCircle
} from 'lucide-react';

const AVAILABLE_TAGS = [
    "Psicología", "Psicoterapia", "Ansiedad", "Depresión", "Estrés",
    "Estres laboral", "Trauma", "SST", "Riesgo psicosocial en el trabajo", "Manizales"
];

export default function BlogCRUD() {
    const [blogs, setBlogs] = useState([]);
    const [loadingList, setLoadingList] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Estado unificado (Combina tu CRUD anterior con los nuevos campos)
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
        image: null, // Archivo físico para enviar al backend
        isFeatured: false
    });
    
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef();

    // Configuración exacta del editor Quill
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
            Swal.fire({ title: 'Error', text: 'No se pudieron cargar los blogs', icon: 'error', confirmButtonColor: '#0d9488' });
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
            Swal.fire({ icon: 'warning', title: 'Falta contenido', text: 'El contenido no puede estar vacío.', confirmButtonColor: '#0d9488' });
            return;
        }

        setLoadingSubmit(true);
        const data = new FormData();
        const slug = formData.slug.trim() || generateSlug(formData.title);
        
        // Empaquetando todos los datos para el backend
        data.append('title', formData.title);
        data.append('slug', slug);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        data.append('author', formData.author);
        data.append('status', formData.status);
        data.append('readTime', formData.readTime);
        data.append('isFeatured', formData.isFeatured);
        data.append('tags', JSON.stringify(formData.tags)); // Enviamos las etiquetas como JSON String

        if (formData.image instanceof File) {
            data.append('image', formData.image);
        }

        try {
            if (editMode) {
                await axios.put(`/api/blog/update/${formData.id}`, data);
                Swal.fire({ title: '¡Actualizado!', text: 'El artículo se guardó correctamente.', icon: 'success', confirmButtonColor: '#0d9488' });
            } else {
                await axios.post('/api/blog/create', data);
                Swal.fire({ title: '¡Publicado!', text: 'El artículo fue creado correctamente.', icon: 'success', confirmButtonColor: '#0d9488' });
            }
            cancelEdit();
            fetchBlogs();
        } catch (err) {
            const errorMsg = err?.response?.data?.message || 'Hubo un problema al guardar el blog';
            Swal.fire({ title: 'Error', text: errorMsg, icon: 'error', confirmButtonColor: '#0d9488' });
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
        setPreviewImage(blog.image_url || blog.image || null); // Ajusta según el campo de URL de tu DB
        setEditMode(true);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Scrollea al formulario
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/api/blog/delete/${id}`);
                setBlogs(blogs.filter((b) => b.id !== id));
                Swal.fire({ title: 'Eliminado', text: 'El artículo ha sido eliminado.', icon: 'success', confirmButtonColor: '#0d9488' });
            } catch (err) {
                Swal.fire({ title: 'Error', text: 'No se pudo eliminar el artículo.', icon: 'error', confirmButtonColor: '#0d9488' });
            }
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 pb-20 font-sans text-stone-800">
            
            {/* SECCIÓN 1: LISTA DE BLOGS (Estilo Stone/Teal adaptado) */}
            <div className="mb-16">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-stone-800">Administrador de Blog</h1>
                    <p className="text-stone-500 text-sm mt-1">Gestiona tus publicaciones, artículos y recursos</p>
                </div>

                <div className="mt-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                    <input 
                        type="text" 
                        placeholder="Buscar por título o autor..." 
                        value={searchTerm} 
                        onChange={e => setSearchTerm(e.target.value)} 
                        className="w-full p-3 mb-6 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:border-teal-500 transition-colors" 
                    />
                    
                    {loadingList ? (
                        <div className="flex justify-center py-8 text-teal-600"><Loader2 className="animate-spin" size={32} /></div>
                    ) : filteredBlogs.length === 0 ? (
                        <p className="text-stone-400 text-center py-8">No hay publicaciones existentes.</p>
                    ) : (
                        <ul className="space-y-4">
                            {filteredBlogs.map(blog => (
                                <li key={blog.id} className="bg-stone-50 border border-stone-100 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-lg font-serif font-bold text-stone-800">{blog.title}</h4>
                                            {blog.isFeatured && <Star size={14} className="text-amber-500" fill="currentColor" />}
                                        </div>
                                        <p className="text-xs font-medium text-stone-500">
                                            <span className="text-teal-600">{blog.author || 'Anónimo'}</span> • Estado: <span className="uppercase tracking-wider">{blog.status}</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <button onClick={() => handleEdit(blog)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-stone-200 hover:border-teal-500 text-stone-700 hover:text-teal-600 px-4 py-2 rounded-lg transition-colors text-sm font-bold">
                                            <Edit3 size={16} /> Editar
                                        </button>
                                        <button onClick={() => handleDelete(blog.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-red-100 hover:border-red-300 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm font-bold">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* SECCIÓN 2: FORMULARIO DE EDICIÓN / CREACIÓN (Idéntico a tu referencia) */}
            <div className="mb-8 border-t border-stone-200 pt-10">
                <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">
                    {editMode ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* COLUMNA IZQUIERDA (Principal) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Título</label>
                            <input
                                type="text"
                                name="title"
                                className="w-full text-xl font-serif font-bold text-stone-800 placeholder:text-stone-300 border-none focus:ring-0 p-0 outline-none"
                                placeholder="Escribe el título aquí..."
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <LinkIcon size={14} className="text-stone-400" />
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">URL del Artículo (Slug)</label>
                            </div>
                            <input
                                type="text"
                                name="slug"
                                placeholder="ej: como-superar-la-ansiedad"
                                className="w-full text-sm font-mono text-teal-700 placeholder:text-stone-300 border-none focus:ring-0 p-0 outline-none"
                                value={formData.slug}
                                onChange={handleChange}
                            />
                            <p className="text-[10px] text-stone-400 mt-2">Usa minúsculas y guiones. Déjalo en blanco para generarlo automáticamente.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Resumen</label>
                            <textarea
                                name="excerpt"
                                rows={3}
                                placeholder="Un breve resumen que aparecerá en las tarjetas..."
                                className="w-full text-stone-600 placeholder:text-stone-300 border-none focus:ring-0 p-0 resize-none outline-none"
                                value={formData.excerpt}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm min-h-[500px] flex flex-col resize-y overflow-hidden">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-4 border-b border-stone-100 pb-2">Contenido Principal</label>
                            <div className="flex-1 h-full flex flex-col">
                                <ReactQuill 
                                    theme="snow" 
                                    value={formData.content} 
                                    onChange={handleEditorChange}
                                    modules={modules}
                                    className="h-full flex-1 mb-10" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA (Configuraciones) */}
                    <div className="space-y-6">
                        
                        {/* Botón Destacado */}
                        <div 
                            onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                            formData.isFeatured ? "bg-amber-50 border-amber-200 shadow-sm" : "bg-white border-stone-200 hover:border-stone-300"
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${formData.isFeatured ? "bg-amber-100 text-amber-600" : "bg-stone-100 text-stone-400"}`}>
                                    <Star size={18} fill={formData.isFeatured ? "currentColor" : "none"} />
                                </div>
                                <div>
                                    <p className={`text-sm font-bold ${formData.isFeatured ? "text-amber-800" : "text-stone-600"}`}>Destacar Artículo</p>
                                    <p className="text-[10px] text-stone-400">Aparecerá primero en el inicio</p>
                                </div>
                            </div>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.isFeatured ? "bg-amber-500" : "bg-stone-300"}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${formData.isFeatured ? "left-6" : "left-1"}`} />
                            </div>
                        </div>

                        {/* Etiquetas y Metadatos */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Etiquetas ({formData.tags.length})</label>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_TAGS.map((tag) => {
                                        const isSelected = formData.tags.includes(tag);
                                        return (
                                            <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${isSelected ? "bg-teal-600 text-white border-teal-600 shadow-md" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-teal-400"}`}>
                                                {isSelected && <Check size={12} />} {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Tiempo de Lectura</label>
                                <input type="text" placeholder="Ej: 5 min" name="readTime" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-700 focus:outline-none focus:border-teal-500" value={formData.readTime} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Autor</label>
                                    <input type="text" name="author" placeholder="Nombre" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-700 focus:outline-none focus:border-teal-500" value={formData.author} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Estado</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-700 focus:outline-none focus:border-teal-500">
                                        <option value="draft">Borrador</option>
                                        <option value="published">Publicado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Subida de Imagen */}
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">Imagen Destacada</label>
                            <div className="relative w-full aspect-video bg-stone-50 rounded-lg overflow-hidden border border-stone-200 border-dashed flex flex-col items-center justify-center group mb-4 transition-colors hover:bg-stone-100">
                                {previewImage ? (
                                    <>
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 shadow-sm hover:bg-white hover:text-red-600 transition-colors">
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="text-stone-300 mb-2 group-hover:text-teal-500 transition-colors" size={32} />
                                        <span className="text-xs text-stone-400 group-hover:text-stone-600 font-medium">Clic para subir imagen</span>
                                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="space-y-3">
                            <button type="submit" disabled={loadingSubmit} className="w-full bg-stone-900 hover:bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                {loadingSubmit ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                {editMode ? 'Guardar Cambios' : 'Publicar Artículo'}
                            </button>
                            
                            {editMode && (
                                <button type="button" onClick={cancelEdit} disabled={loadingSubmit} className="w-full bg-white border border-stone-200 text-stone-500 hover:bg-stone-50 hover:text-stone-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                                    <XCircle size={18} /> Cancelar Edición
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* ESTILOS GLOBALES PARA EL EDITOR QUILL */}
            <style dangerouslySetInnerHTML={{__html: `
                .ql-editor .ql-align-justify { text-align: justify; text-justify: inter-word; }
                .ql-editor li.ql-align-justify { text-align: justify; }
                .ql-editor .ql-indent-1 { padding-left: 3em; }
                .ql-editor .ql-indent-2 { padding-left: 6em; }
                .ql-editor .ql-indent-3 { padding-left: 9em; }
                .ql-toolbar { border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; background: #fafaf9; border-color: #e7e5e4 !important; }
                .ql-container { border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; border-color: #e7e5e4 !important; font-family: inherit; }
                .ql-editor { font-size: 1.05rem; color: #44403c; }
            `}} />
        </div>
    );
}