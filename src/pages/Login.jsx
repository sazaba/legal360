import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios'; // ✔️ Usa la instancia con baseURL

export default function Login() {
    const [formData, setFormData] = useState({ user: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/login', {
                user: formData.user,
                password: formData.password
            });

            const data = response.data;

            login(data.usuario, data.token);
            navigate('/');
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            const mensaje = error?.response?.data?.mensaje || 'Error del servidor. Intenta más tarde.';
            alert(mensaje);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6"
            >
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-3xl font-bold text-center text-white"
                >
                    Iniciar Sesión
                </motion.h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <label htmlFor="user" className="block mb-1 text-sm font-medium text-gray-300">
                            Usuario o Correo
                        </label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={formData.user}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                            placeholder="ejemplo@correo.com o usuario123"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                            placeholder="********"
                        />
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors font-semibold text-white"
                    >
                        Ingresar
                    </motion.button>
                </form>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-sm text-center text-gray-500"
                >
                    ¿Olvidaste tu contraseña?{' '}
                    <a href="#" className="text-indigo-400 hover:underline">
                        Recupérala aquí
                    </a>
                </motion.p>
            </motion.div>
        </div>
    );
}
