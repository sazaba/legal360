import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.link/twbzum"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 p-4 rounded-full shadow-[0_10px_40px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 z-[999] bg-gradient-to-br from-[#d4af37] via-[#f5e27a] to-[#b8860b] text-[#001e33] group"
      aria-label="Contactar por WhatsApp"
    >
      {/* Efecto de pulso decorativo */}
      <span className="absolute inset-0 rounded-full bg-[#f5e27a] animate-ping opacity-20 group-hover:opacity-40"></span>
      
      <FaWhatsapp className="relative text-3xl drop-shadow-md" />
    </a>
  );
};

export default WhatsAppButton;