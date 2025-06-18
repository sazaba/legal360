// BlogPublicList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BlogPublicList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('api/blog/published'); // Ya tiene /api como prefijo en la instancia
                setBlogs(res.data);
            } catch (error) {
                console.error('Error cargando blogs públicos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);


    if (loading) return <p className="text-center py-10">Cargando publicaciones...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-center mb-6">Últimas Publicaciones</h2>

            <Swiper
                spaceBetween={24}
                slidesPerView={1}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
            >
                {blogs.map(blog => (
                    <SwiperSlide key={blog.id}>
                        <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
                            {blog.image_url && (
                                <img
                                    src={blog.image_url}
                                    alt={blog.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
                                <p className="text-sm text-gray-400 mb-4">Por {blog.author || 'Anónimo'}</p>
                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className="inline-block bg-white text-gray-900 hover:bg-gray-200 text-sm px-4 py-2 rounded font-semibold"
                                >
                                    Leer más
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}