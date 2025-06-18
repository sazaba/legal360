import React, { useEffect, useState, useRef } from 'react';
import axios from '../api/axios';
import Swal from 'sweetalert2';
import {
    UploadOutlined,
    DeleteOutlined,
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    OrderedListOutlined,
    UnorderedListOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    LinkOutlined,
    CodeOutlined,
    FileImageOutlined,
    BlockOutlined
} from '@ant-design/icons';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import Blockquote from '@tiptap/extension-blockquote';

export default function BlogCRUD() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        title: '',
        slug: '',
        content: '',
        author: '',
        status: 'draft',
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const fileInputRef = useRef();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link,
            CodeBlock,
            Image,
            Blockquote
        ],
        content: formData.content,
        editorProps: {
            attributes: {
                class: 'min-h-[200px] focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            setFormData(prev => ({ ...prev, content: editor.getHTML() }));
        },
    });

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const res = await axios.get('/api/blog/list');
                setBlogs(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                Swal.fire({ title: 'Error', text: 'No se pudieron cargar los blogs', icon: 'error', background: '#0f172a', color: '#ffffff' });
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'image' && files[0]) {
            setFormData({ ...formData, image: files[0] });
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const clearImage = () => {
        setFormData({ ...formData, image: null });
        setPreviewImage(null);
        fileInputRef.current.value = null;
    };

    const cancelEdit = () => {
        setFormData({ id: null, title: '', slug: '', content: '', author: '', status: 'draft', image: null });
        setPreviewImage(null);
        setEditMode(false);
        if (editor) editor.commands.clearContent();
        Swal.fire({ title: 'Cancelado', text: 'Edición cancelada.', icon: 'info', background: '#0f172a', color: '#ffffff' });
    };

    const generateSlug = (text) => text.toLowerCase().trim().replace(/[^ña-z0-9\s-]/g, '').replace(/\s+/g, '-');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        const slug = formData.slug.trim() || generateSlug(formData.title);
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'image' && value instanceof File) {
                data.append('image', value);
            } else if (value !== null) {
                data.append(key, value);
            }
        });
        try {
            if (editMode) {
                await axios.put(`/api/blog/update/${formData.id}`, data);
                Swal.fire({ title: 'Actualizado', text: 'El blog fue actualizado correctamente', icon: 'success', background: '#0f172a', color: '#ffffff' });
            } else {
                await axios.post('/api/blog/create', data);
                Swal.fire({ title: 'Publicado', text: 'El blog fue creado correctamente', icon: 'success', background: '#0f172a', color: '#ffffff' });
            }
            setFormData({ id: null, title: '', slug: '', content: '', author: '', status: 'draft', image: null });
            setPreviewImage(null);
            setEditMode(false);
            const res = await axios.get('/api/blog/list');
            setBlogs(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            const errorMsg = err?.response?.data?.message || 'Hubo un problema al guardar el blog';
            Swal.fire({ title: 'Error', text: errorMsg, icon: 'error', background: '#0f172a', color: '#ffffff' });
        }
    };

    const handleEdit = (blog) => {
        setFormData({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            author: blog.author || '',
            status: blog.status || 'draft',
            image: null,
        });
        setPreviewImage(blog.image_url || null);
        setEditMode(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (editor) editor.commands.setContent(blog.content || '');
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar publicación?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            background: '#0f172a',
            color: '#ffffff',
            showCancelButton: true,
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: { popup: 'rounded-xl shadow-lg border border-gray-700' }
        });
        if (!result.isConfirmed) return;
        try {
            await axios.delete(`/api/blog/delete/${id}`);
            setBlogs(blogs.filter(b => b.id !== id));
            Swal.fire({ title: 'Eliminado', text: 'El blog fue eliminado exitosamente', icon: 'success', background: '#0f172a', color: '#ffffff' });
        } catch (err) {
            Swal.fire({ title: 'Error', text: 'No se pudo eliminar el blog', icon: 'error', background: '#0f172a', color: '#ffffff' });
        }
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="text-white max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-20 py-6">
            <h2 className="text-3xl font-bold mb-6">Administrador de Blog</h2>
            <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Publicaciones existentes</h3>
                <input type="text" placeholder="Buscar por título o autor..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 mb-4 rounded-xl bg-gray-700 text-white focus:outline-none" />
                {loading ? (
                    <p className="text-gray-400">Cargando publicaciones...</p>
                ) : filteredBlogs.length === 0 ? (
                    <p className="text-gray-400">No hay publicaciones que coincidan.</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredBlogs.map(blog => (
                            <li key={blog.id} className="bg-gray-800 p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h4 className="text-lg font-bold">{blog.title}</h4>
                                    <p className="text-sm text-gray-400">Autor: {blog.author || 'Anónimo'} — Estado: {blog.status}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(blog)} className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-xl">Editar</button>
                                    <button onClick={() => handleDelete(blog.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-xl">
                <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl focus:outline-none" required />
                <input type="text" name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl focus:outline-none" required />
                {editor && (
                    <div className="space-y-2">
                        <div className="bg-white text-black rounded-xl overflow-hidden">
                            <EditorContent editor={editor} className="p-4" />
                        </div>
                    </div>
                )}
                <input type="text" name="author" placeholder="Autor" value={formData.author} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl focus:outline-none" />
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 bg-gray-700 rounded-xl focus:outline-none">
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                </select>
                <div className="space-y-2">
                    <label htmlFor="upload" className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer hover:text-blue-300">
                        <UploadOutlined className="text-lg" />
                        <span>Haz clic aquí para subir una imagen</span>
                    </label>
                    <input id="upload" type="file" name="image" accept="image/*" onChange={handleChange} ref={fileInputRef} className="hidden" />
                    {previewImage && (
                        <div className="flex items-center space-x-4">
                            <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
                            <button onClick={clearImage} type="button" className="text-red-500 hover:text-red-700">
                                <DeleteOutlined className="text-lg" /> Eliminar imagen
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl w-full md:w-auto">
                        {editMode ? 'Actualizar' : 'Publicar'}
                    </button>
                    {editMode && (
                        <button type="button" onClick={cancelEdit} className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-xl w-full md:w-auto">
                            Cancelar edición
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
