import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    Calendar, 
    Clock, 
    Share2, 
    ChevronLeft, 
    ChevronRight, 
    ArrowRight
} from 'lucide-react';

// Swiper 11 Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// Swiper 11 Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const goldColor = '#e6d769';

export default function BlogView() {
    const { slug } = useParams();
    const swiperRef = useRef(null);
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            setLoading(true);
            try {
                // 1. Obtener el post actual
                const resBlog = await axios.get(`/api/blog/${slug}`);
                setBlog(resBlog.data);

                // 2. Obtener relacionados
                const resRelated = await axios.get('/api/blog/published');
                const related = resRelated.data
                    .filter(b => b.slug !== slug)
                    .slice(0, 6);
                setRelatedBlogs(related);

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [slug]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-CO', {
            day: '2-digit', month: 'long', year: 'numeric'
        });
    };

    const parseTags = (tagsField) => {
        try {
            return typeof tagsField === 'string' ? JSON.parse(tagsField) : (Array.isArray(tagsField) ? tagsField : []);
        } catch (e) { return []; }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#001e33]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#e6d769]/20 border-t-[#e6d769] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 font-medium animate-pulse">Preparando lectura premium...</p>
                </div>
            </div>
        );
    }

    if (!blog) return <div className="min-h-screen flex items-center justify-center text-white">Publicación no encontrada</div>;

    const tags = parseTags(blog.tags);

    return (
        <div className="bg-[#001e33] min-h-screen font-sans text-gray-200">
            
            {/* BARRA SUPERIOR DE NAVEGACIÓN */}
            <div className="sticky top-0 z-50 bg-[#001e33]/90 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-xs font-bold text-[#e6d769] hover:text-white transition-colors tracking-widest">
                        <ArrowLeft size={16} /> VOLVER AL INICIO
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-[#e6d769] transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-6 py-12 md:py-24">
                {/* HEADER DEL POST */}
                <header className="mb-12 text-center">
                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                        {tags.map((tag, i) => (
                            <span key={i} className="bg-[#e6d769]/10 text-[#e6d769] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-[#e6d769]/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1] mb-10">
                        {blog.title}
                    </h1>

                    <div className="flex items-center justify-center gap-8 text-xs text-gray-500 font-bold tracking-widest uppercase">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-[#e6d769]" />
                            {formatDate(blog.created_at)}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-[#e6d769]" />
                            {blog.readTime || "5 MIN"}
                        </div>
                    </div>
                </header>

                {/* IMAGEN DESTACADA */}
                {blog.image_url && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative h-[350px] md:h-[550px] rounded-[2rem] overflow-hidden mb-20 shadow-2xl border border-white/10"
                    >
                        <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001e33]/60 via-transparent to-transparent"></div>
                    </motion.div>
                )}

                {/* CONTENIDO DEL ARTÍCULO */}
                <div className="prose-custom max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* AUTOR FOOTER */}
                <footer className="mt-24 pt-12 border-t border-white/10 flex items-center gap-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#e6d769] to-[#d4af37] rounded-2xl flex items-center justify-center text-[#001e33] font-black text-xl shadow-lg shadow-[#e6d769]/10">
                        {blog.author?.charAt(0).toUpperCase() || 'L'}
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black mb-1">Publicado por</p>
                        <p className="text-white font-semibold text-lg">{blog.author || 'Legal 360 SAS'}</p>
                    </div>
                </footer>
            </article>

            {/* SECCIÓN DE PUBLICACIONES RELACIONADAS */}
            {related_blogs_section()}

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap');
                
                .prose-custom {
                    font-family: 'Montserrat', sans-serif;
                    line-height: 2;
                    font-size: 1.15rem;
                    color: #94a3b8;
                    font-weight: 300;
                }
                .prose-custom h2, .prose-custom h3 {
                    color: white;
                    font-family: serif;
                    margin-top: 4rem;
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                    line-height: 1.3;
                }
                .prose-custom h2 { font-size: 2.5rem; border-left: 3px solid #e6d769; padding-left: 1.5rem; }
                .prose-custom p { margin-bottom: 2rem; }
                .prose-custom strong { color: #f8fafc; font-weight: 600; }
                
                .prose-custom blockquote {
                    border-left: 2px solid #e6d769;
                    padding: 2.5rem;
                    font-style: italic;
                    color: #e6d769;
                    background: rgba(230, 215, 105, 0.03);
                    border-radius: 0 2rem 2rem 0;
                    margin: 3.5rem 0;
                    font-size: 1.25rem;
                }
                .prose-custom ul { list-style: none; padding-left: 1rem; margin-bottom: 2rem; }
                .prose-custom li { position: relative; padding-left: 2rem; margin-bottom: 1rem; }
                .prose-custom li::before {
                    content: "•";
                    color: #e6d769;
                    position: absolute;
                    left: 0;
                    font-weight: bold;
                }
                
                .glass-panel {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
            `}} />
        </div>
    );

    function related_blogs_section() {
        if (relatedBlogs.length === 0) return null;

        return (
            <section className="py-24 bg-black/30 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-xl">
                            <span className="text-[#e6d769] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">EXPLORA MÁS</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">Lecturas Recomendadas</h2>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => swiperRef.current?.slidePrev()} 
                                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#e6d769] hover:text-[#001e33] transition-all duration-500 active:scale-90"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={() => swiperRef.current?.slideNext()} 
                                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#e6d769] hover:text-[#001e33] transition-all duration-500 active:scale-90"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
                        spaceBetween={32}
                        slidesPerView={1}
                        speed={800}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-16"
                    >
                        {relatedBlogs.map((post) => {
                            const postTags = parseTags(post.tags);
                            return (
                                <SwiperSlide key={post.id}>
                                    <Link to={`/blog/${post.slug}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                        <article className="glass-panel group h-full flex flex-col rounded-[2rem] overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#e6d769]/5">
                                            <div className="relative h-64 overflow-hidden bg-stone-900">
                                                <img 
                                                    src={post.image_url} 
                                                    alt={post.title} 
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                                                />
                                                <div className="absolute top-6 left-6">
                                                    <span className="bg-[#001e33]/90 backdrop-blur-md text-[#e6d769] text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full border border-[#e6d769]/30 uppercase">
                                                        {postTags[0] || 'LEGAL'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-10 flex flex-col flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#e6d769] transition-colors line-clamp-2 leading-tight">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm line-clamp-3 mb-8 flex-1 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center text-[#e6d769] font-black text-xs tracking-widest uppercase group/link">
                                                    LEER ARTÍCULO 
                                                    <ArrowRight size={16} className="ml-3 transition-transform duration-500 group-hover/link:translate-x-2" />
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    <div className="mt-16 text-center">
                        <Link to="/blog" className="inline-block px-12 py-5 border border-[#e6d769]/30 rounded-full text-white font-black hover:bg-[#e6d769] hover:text-[#001e33] hover:border-[#e6d769] transition-all duration-500 tracking-[0.3em] text-[10px] shadow-xl">
                            VER TODO EL ARCHIVO
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}