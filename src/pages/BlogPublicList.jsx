import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ReadOutlined, ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BlogPublicList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('api/blog/published');
                setBlogs(res.data);
            } catch (error) {
                console.error('Error cargando blogs públicos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-[50vh] bg-[#0c111b] flex flex-col items-center justify-center">
                <LoadingOutlined className="text-5xl text-[#e6d769] animate-spin mb-4" />
                <p className="text-[#e6d769] font-montserrat tracking-widest uppercase text-sm animate-pulse">
                    Cargando artículos...
                </p>
            </div>
        );
    }

    return (
        // Fondo principal oscuro (#0c111b) - Isolate para renderizado GPU en Safari
        <section className="relative w-full min-h-[100svh] bg-[#0c111b] py-24 sm:py-32 isolate overflow-hidden">
            
            {/* ================= OLA DE TRANSICIÓN PREMIUM ================= */}
            {/* Esta ola es del color #f8fafc (el mismo de FormularioPlanes) para conectar ambos mundos */}
            <div className="absolute top-0 left-0 w-full overflow-hidden z-10 pointer-events-none -translate-y-[1px]">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px] block">
                    <path d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" className="fill-[#f8fafc]" />
                </svg>
            </div>

            {/* Overlays para profundidad (brillo sutil en el centro) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#001e33]/50 via-[#0c111b] to-[#0c111b] z-[-1]"></div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                
                {/* Cabecera de la sección */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-montserrat tracking-tight flex flex-col sm:flex-row items-center justify-center gap-4 drop-shadow-lg">
                        <ReadOutlined className="text-[#fcd34d] text-4xl sm:text-5xl" />
                        <span>Actualidad <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8860b]">Jurídica</span></span>
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-gray-400 font-roboto max-w-2xl mx-auto">
                        Mantente informado con nuestros artículos, análisis y novedades sobre derecho laboral, comercial y normativas en Colombia.
                    </p>
                </div>

                {/* ================= CARRUSEL SWIPER ================= */}
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={blogs.length > 3} // Solo hace loop si hay suficientes artículos
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true 
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    modules={[Pagination, Autoplay]}
                    className="pb-16" // Espacio inferior para que los puntos dorados no pisen las tarjetas
                >
                    {blogs.map((blog) => (
                        <SwiperSlide key={blog.id} className="h-auto">
                            {/* Tarjeta Glassmorphism Ultra Premium */}
                            <div className="group flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-[#e6d769]/40 hover:-translate-y-2 transition-all duration-500 cursor-pointer transform-gpu">
                                
                                {/* Contenedor de la Imagen Acelerada por GPU */}
                                <div className="w-full h-56 sm:h-64 overflow-hidden relative">
                                    {/* Capa de contraste que desaparece al hacer hover */}
                                    <div className="absolute inset-0 bg-[#001e33]/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                                    <img
                                        src={blog.image_url || 'https://via.placeholder.com/800x600/001e33/e6d769?text=Legal+360'}
                                        alt={blog.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform-gpu will-change-transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                        style={{ WebkitTransform: 'translateZ(0)' }} // Anti-glitch Safari
                                    />
                                    {/* Badge decorativo */}
                                    <div className="absolute top-4 left-4 z-20 bg-[#0c111b]/80 backdrop-blur-sm border border-[#e6d769]/30 text-[#e6d769] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        Artículo
                                    </div>
                                </div>

                                {/* Contenido de la Tarjeta */}
                                <div className="p-6 sm:p-8 flex flex-col flex-grow relative">
                                    <p className="text-[#e6d769] text-xs font-montserrat uppercase tracking-widest mb-3 font-semibold">
                                        Por {blog.author || 'Equipo Legal 360'}
                                    </p>
                                    
                                    <h3 className="text-xl sm:text-2xl font-bold text-white font-montserrat leading-snug mb-4 group-hover:text-[#e6d769] transition-colors line-clamp-3">
                                        {blog.title}
                                    </h3>

                                    {/* Botón empujado siempre hacia abajo gracias a mt-auto */}
                                    <div className="mt-auto pt-6">
                                        <Link
                                            to={`/blog/${blog.slug}`}
                                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-bold text-[#001e33] bg-gradient-to-r from-[#d4af37] via-[#f5e27a] to-[#d4af37] rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-wider"
                                        >
                                            Leer Artículo <ArrowRightOutlined />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Estilos inyectados para dominar a Swiper JS y volverlo de Lujo (Dorado) */}
            <style jsx global>{`
                /* Cambiar color de los bullets inactivos a blanco semitransparente */
                .swiper-pagination-bullet {
                    background-color: rgba(255, 255, 255, 0.4) !important;
                    opacity: 1 !important;
                    width: 10px !important;
                    height: 10px !important;
                    transition: all 0.3s ease !important;
                }
                
                /* Bullet activo: Dorado, más grande y con brillo */
                .swiper-pagination-bullet-active {
                    background-color: #e6d769 !important;
                    width: 24px !important;
                    border-radius: 10px !important;
                    box-shadow: 0 0 10px rgba(230, 215, 105, 0.6) !important;
                }
            `}</style>
        </section>
    );
}