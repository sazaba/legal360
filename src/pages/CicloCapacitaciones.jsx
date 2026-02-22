import React from 'react';
import { 
  CheckCircleOutlined, 
  BulbOutlined, 
  TeamOutlined, 
  SafetyCertificateOutlined, 
  LineChartOutlined 
} from '@ant-design/icons';

const CicloCapacitaciones = () => {
  const modulos = [
    {
      titulo: 'Actualización normativa y legal',
      descripcion: 'Cumplimiento de requisitos y manejo adecuado de la normatividad vigente.',
      icono: <CheckCircleOutlined className="text-3xl text-[#e6d769]" />
    },
    {
      titulo: 'Desarrollo de habilidades blandas',
      descripcion: 'Liderazgo, comunicación asertiva, resolución de conflictos y trabajo en equipo.',
      icono: <TeamOutlined className="text-3xl text-[#e6d769]" />
    },
    {
      titulo: 'Gestión organizacional',
      descripcion: 'Optimización de procesos, productividad y cultura de la mejora continua.',
      icono: <LineChartOutlined className="text-3xl text-[#e6d769]" />
    },
    {
      titulo: 'Salud y bienestar laboral',
      descripcion: 'Estrategias de prevención, autocuidado y promoción de entornos saludables.',
      icono: <SafetyCertificateOutlined className="text-3xl text-[#e6d769]" />
    },
    {
      titulo: 'Gestión comercial',
      descripcion: 'Prospección y fidelización de clientes, gestión de cartera y seguimiento de clientes, capacitación en servicio al cliente.',
      icono: <BulbOutlined className="text-3xl text-[#e6d769]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#001e33] pt-24 pb-16 px-4 font-roboto">
      <div className="max-w-5xl mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold font-montserrat text-[#e6d769] mb-6">
            Ciclo de Capacitaciones
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos Ciclos de Capacitaciones para fortalecer el desarrollo integral del talento humano, enfocados en preparar a tu equipo para los retos del día a día.
          </p>
        </div>

        {/* Lista de módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modulos.map((modulo, index) => (
            <div 
              key={index} 
              className={`bg-[#032b4c]/50 border border-[#0f3a57] rounded-xl p-6 flex items-start space-x-4 hover:border-[#e6d769] transition-colors duration-300 ${index === modulos.length - 1 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}
            >
              <div className="mt-1 flex-shrink-0">
                {modulo.icono}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#e6d769] mb-2 font-montserrat">
                  {modulo.titulo}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {modulo.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CicloCapacitaciones;