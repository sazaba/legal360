import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BlogView() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get('/api/blog/list');
                const allBlogs = Array.isArray(res.data) ? res.data : [];
                const post = allBlogs.find(b => b.slug === slug);
                setBlog(post);

                if (post) {
                    const related = allBlogs
                        .filter(b => b.id !== post.id && b.status === 'published')
                        .slice(0, 4);
                    setRelatedBlogs(related);
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (err) {
                console.error('Error cargando el blog:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
        arrows: false,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="text-center">
                    <svg className="animate-spin h-8 w-8 text-gray-900 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <p className="text-gray-900 text-lg">Cargando publicación...</p>
                    <div className="grid gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-4 px-10">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="bg-gray-800 rounded shadow animate-pulse">
                                <div className="h-40 bg-gray-700" />
                                <div className="p-4">
                                    <div className="h-4 bg-gray-700 mb-2 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) return <p className="text-center py-10">Publicación no encontrada</p>;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white text-gray-900 min-h-screen mt-20"
            >
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-4"
                    >
                        {blog.title}
                    </motion.h1>
                    <p className="text-sm text-gray-500 mb-6">Por {blog.author || 'Anónimo'} - {new Date(blog.created_at).toLocaleDateString()}</p>
                    {blog.image_filename && (
                        <motion.img
                            src={`/uploads/blog/${blog.image_filename}`}
                            alt={blog.title}
                            className="w-full h-96 object-cover rounded mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        />
                    )}
                    <div className="prose prose-lg max-w-none leading-relaxed space-y-4">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                </div>

                <div className="bg-gray-900 py-12 shadow-2xl">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-2xl font-semibold mb-6 text-white">Otras publicaciones</h2>
                        {relatedBlogs.length > 0 ? (
                            <Slider {...sliderSettings}>
                                {relatedBlogs.map(related => (
                                    <div key={related.id} className="px-2">
                                        <Link
                                            to={`/blog/${related.slug}`}
                                            className="bg-gray-800 rounded shadow hover:shadow-lg transition overflow-hidden block"
                                            onClick={() => {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                setLoading(true);
                                            }}
                                        >
                                            {related.image_filename && (
                                                <img
                                                    src={`/uploads/blog/${related.image_filename}`}
                                                    alt={related.title}
                                                    className="h-40 w-full object-cover"
                                                />
                                            )}
                                            <div className="p-4">
                                                <h3 className="font-bold text-md mb-2 text-white">{related.title}</h3>
                                                <p className="text-sm text-gray-300">Por {related.author || 'Anónimo'}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p className="text-gray-400">No hay publicaciones relacionadas disponibles.</p>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
