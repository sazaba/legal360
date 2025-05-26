import React from "react";
import { PiBriefcaseDuotone, PiPulseDuotone, PiChatsTeardropDuotone } from "react-icons/pi";
import { motion } from "framer-motion";

const PorQueNosotros = () => {
  const cards = [
    {
      icon: <PiBriefcaseDuotone className="text-[#FFA700] text-7xl mb-6 drop-shadow-glow" />,
      title: "Estrategia Legal 360°",
      text: "Diseñamos sistemas legales preventivos, integrales y personalizados. Olvida los riesgos: nosotros pensamos por ti."
    },
    {
      icon: <PiPulseDuotone className="text-[#FFA700] text-7xl mb-6 drop-shadow-glow" />,
      title: "Disponibilidad Real",
      text: "Estamos contigo en cada paso. WhatsApp, correo o llamada. Te respondemos como si tu urgencia fuera nuestra."
    },
    {
      icon: <PiChatsTeardropDuotone className="text-[#FFA700] text-7xl mb-6 drop-shadow-glow" />,
      title: "Claridad Absoluta",
      text: "Convertimos la ley en soluciones prácticas. Nuestro lenguaje es sencillo, directo y accionable."
    }
  ];

  return (
    <section
      id="por-que-nosotros"
      className="relative z-10 py-24 bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      {/* Separador decorativo superior */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180 z-10">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-[80px]">
          <path
            d="M0.00,49.98 C150.00,150.00 349.19,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-[#02182c]"
          />
        </svg>
      </div>

      {/* Efectos decorativos de fondo */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#FFA700]/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-[#FFA700]/10 rounded-full blur-2xl animate-pulse-slow" />

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 text-center relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold mb-20 text-[#FFA700] font-montserrat"
        >
          ¿Por qué elegir Legal360?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-[#1f1f1f] to-[#2b2b2b] rounded-[2rem] p-10 border border-[#FFA700]/20 shadow-[0_15px_40px_rgba(255,167,0,0.05)] hover:shadow-[0_20px_60px_rgba(255,167,0,0.2)] transform hover:-translate-y-3 transition-all duration-500"
            >
              <div className="flex justify-center">{card.icon}</div>
              <h3 className="text-2xl font-bold text-white mt-6 mb-4 font-montserrat">
                {card.title}
              </h3>
              <p className="text-gray-300 text-base font-roboto leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PorQueNosotros;
