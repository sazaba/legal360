import React, { useEffect, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';
import { AiOutlinePaperClip } from "react-icons/ai";
import cristab from '../assets/images/Cris_tab.webp'
import { Link } from 'react-router-dom';

const TerminosWeb = () => {
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <section className="pt-32 pb-16 px-6 sm:px-10 font-sans min-h-screen bg-[#001e33] text-white select-none">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6 text-[#e6d769] border-b-4 border-[#e6d769] pb-2">
                    Términos Legales Web
                </h1>

                <div className="text-gray-100 space-y-4 text-base leading-relaxed text-justify pointer-events-none">
                    <p>Apreciado Usuario,</p>
                    <p>
                        Los términos y condiciones expresados a continuación, regulan el uso de este sitio web y los cuales se han puesto a su servicio. Cuando ingresa y usa nuestra página web, adquiere de forma automática la calidad de ‘usuario’. En virtud de lo anterior, el Usuario entiende que el uso de la presente herramienta significa una aceptación de este Aviso Legal, así como de las condiciones generales de uso. En cualquier momento y sin obligación de notificarlo con anterioridad, LEGAL 360 S.A.S., puede editar, cambiar, renovar, agregar o retirar cualquier parte o la totalidad de los términos y condiciones del sitio web. Por eso es tu responsabilidad como usuario, verificar la información contenida en los términos y condiciones del sitio, siempre que vayas a hacer uso de alguno de sus contenidos o servicios.
                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Aviso Legal</h3>
                    <p>
                        El cliente al consentir en cualquiera de los contratos que se perfeccionan al realizar transacciones en www.legal360.co, declara bajo la gravedad de juramento, que sus ingresos provienen de actividades lícitas, que no se encuentra con registro negativo en listados de prevención de lavado de activos nacionales o internacionales, que no se encuentra dentro de una de las dos categorías de lavado de activos (conversión o movimiento) y que en consecuencia, se obliga a responder frente a LEGAL 360 S.A.S., por todos los perjuicios que se llegaren a causar como consecuencia de esta afirmación. En igual sentido responderá ante terceros. Declara igualmente, que sus conductas se ajustan a la ley y a la ética y, en consecuencia, se obliga a implementar las medidas tendientes a evitar que sus operaciones puedan ser utilizadas con o sin su consentimiento y conocimiento como instrumentos para el ocultamiento, manejo, inversión o aprovechamiento en cualquier forma de dinero u otros bienes provenientes de actividades delictivas, o para dar apariencia de legalidad a éstas actividades. En el mismo sentido, se compromete a actuar dentro del marco legal vigente en Colombia, dando cumplimiento a todos los procedimientos, trámites y obligaciones contemplados en la Ley y demás normas pertinentes y que cualquier evidencia de que estos principios no se cumplen o puedan estar en entredicho será causal suficiente para resolver, a criterio de la Parte cumplida, el Contrato que resulte de su aceptación.
                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Introducción</h3>
                    <p>
                        LEGAL 360 S.A.S., a través de su página web ofrece un servicio para facilitar a los clientes el conocimiento y el acceso a los productos y servicios. La utilización del portal www.legal360.co, se rige por los siguientes términos y condiciones: <br /> <br />


                        Ingresar y usar esta herramienta significa que el usuario ha leído, entendido y aceptado los términos y condiciones para el uso del sitio; en caso contrario debe abstenerse de utilizarlo.<br /> <br />


                        Los términos y condiciones pueden ser cambiados por LEGAL 360 S.A.S., en cualquier momento y sin previo aviso.<br /> <br />


                        LEGAL 360 S.A.S., No garantiza el acceso permanente e ininterrumpido al sitio web y no asume responsabilidad ante los clientes actuales o potenciales, por problemas de conexión a Internet, falta de disponibilidad o continuidad del funcionamiento de la página web y de sus servicios, ni por cualquier otra situación que pueda afectar el acceso a este canal.<br /> <br />


                        No se hace cargo de los daños o perjuicios derivados del mal uso de la información de la página, pues el “usuario” entiende y acepta que el acceso a esta herramienta, así como el uso que pueda hacerse de los servicios e información contenida en la misma, son de la exclusiva responsabilidad del “usuario” que los realiza.<br /> <br />


                        Podrá realizar, en cualquier momento y sin necesidad de previo aviso, modificaciones en la presentación y configuración de la página, así como en los contenidos y servicios de la misma.<br /> <br />


                        Advierte que algunos de los textos contenidos en la página, enlaces y/o información incluidos en la misma podrían no ser veraces o no estar actualizados o haber sido recibidos o informados por terceras personas sobre las cuales LEGAL 360 S.A.S., no tiene control. Por dicha razón, LEGAL 360 S.A.S., no responderá sobre los errores u omisiones relativos a la información que no sea de su autoría, ni tampoco de los daños o perjuicios que se puedan llegar a ocasionar como resultado del uso de dicha información. Además cabe resaltar que aunque este es un sitio seguro, no está libre de errores y en consecuencia la información general, así como las características de los productos anunciados y los precios, pueden variar con ocasión de errores humanos, tecnológicos, manipulación por terceros no autorizados, virus o cualquier evento de invasión o manipulación tecnológica.<br /> <br />
                        Tiene la posibilidad de obtener registros magnéticos con el fin de tener pruebas de las operaciones y/o transacciones realizadas por el “usuario”.<br /> <br />


                        Se reserva la posibilidad de realizar verificaciones posteriores a toda solicitud ejecutada por el “usuario”, como también de solicitar confirmación de la información por parte del “usuario”. Además, LEGAL 360 S.A.S., está en la capacidad de rechazar las solicitudes efectuadas por el cliente, ya sea parcial o totalmente, de cualquier oferta que se presente en la página. En tal caso, LEGAL 360 S.A.S., notificará dicha situación.<br /> <br />
                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Propiedad Intelectual</h3>
                    <p>
                        Los derechos de propiedad intelectual de la página son propiedad de LEGAL 360 S.A.S., exceptuando lo expresamente estipulado en estos términos y condiciones, queda prohibido todo acto de copia, reproducción, modificación, creación de trabajos derivados, venta o distribución, exhibición de los contenidos, de ninguna manera o por ningún medio, incluyendo, mas no limitado a, medios electrónicos, mecánicos, de fotocopiado, de grabación o de cualquier otra índole, sin el permiso previo por escrito de LEGAL 360 S.A.S. ,o del titular de los derechos de autor. El contenido que se presenta en la página, material informático, gráfico, publicitario, fotográfico, de multimedia, audiovisual y/o de diseño, así como todos los contenidos, textos y bases de datos puestos a su disposición en este sitio son de propiedad exclusiva de LEGAL 360 S.A.S.<br /> <br />


                        Las personas que no estén autorizadas deberán abstenerse de extraer o reutilizar dicha información. Todas las marcas, enseñas, logos, nombres y cualesquiera otros signos distintivos, así como los modelos de utilidad y/o diseños industriales y demás elementos de propiedad industrial o intelectual insertados, usados y/o desplegados en este sitio son Propiedad exclusiva de LEGAL 360 S.A.S., del tercero titular de los mismos. Nada en esta página podrá ser interpretado como concesión u otorgamiento a cualquier título de autorizaciones, licencias o cualquier otro derecho para usar o disponer de cualquier forma de la Propiedad Intelectual o Industrial, sin el permiso por escrito LEGAL 360 S.A.S., o del titular de los derechos de la misma.<br /> <br />


                        LEGAL 360 S.A.S., tiene el derecho de rechazar el ingreso del “usuario” a la página. El “usuario” entiende que en esta herramienta no se lleva a cabo ningún tipo de proceso de aprobación de crédito o similar.<br /> <br />
                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Confidencialidad de la cuenta</h3>
                    <p>
                        El usuario debe manejar con completa confidencialidad su cuenta, así como de cualquier otro número de identificación o clave del Usuario, independientemente de que éstos hayan sido proporcionados por LEGAL 360 S.A.S., o seleccionados por el “usuario”. Todas las actividades que se realicen con su cuenta como: intercambios, consultas, solicitudes y demás actividades; serán de su exclusiva responsabilidad.<br /> <br />


                        Por lo anterior, así el cliente tenga o no tenga cuenta en la página de LEGAL 360 S.A.S., es necesario que cuente con dispositivos de seguridad electrónicos y adopte las medidas necesarias que eviten, entre otros: la suplantación de la persona, la utilización de su información por terceras personas, los fraudes, las intrusiones, los virus, espías y similares. Además, mediante estos dispositivos de seguridad se podrá verificar la identidad del “usuario”.<br /> <br />
                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Aviso de Privacidad y Autorización expresa para el tratamiento de datos personales</h3>
                    <p>
                        A lo largo del proceso de información y/o verificación en la plataforma, solicitaremos algunos datos personales a nuestros clientes. Dando cumplimiento con la Ley 1581 de 2012 “Ley de protección de datos personales” y el Decreto 1377 de 2013, LEGAL 360 S.A.S., informa que es responsable de la administración de dichos datos. Según nuestras políticas de tratamiento de datos personales, los mecanismos a través de los cuales hacemos uso de éstos son seguros y confidenciales, pues contamos con los medios tecnológicos idóneos para asegurar que sean almacenados para evitar el acceso indeseado por parte de terceras personas, y en ese mismo orden aseguramos la confidencialidad de los mismos.<br /> <br />


                        Usaremos la información entregada por nuestros clientes para realizar el procesamiento y entrega de los pedidos y para enviar información que pueda ser útil a nuestros clientes o que hayan solicitado específicamente, incluida información sobre nuestros productos y servicios, a menos que nos hayan comunicado que se oponen a ser contactados para estos fines.<br /> <br />


                        Sujeto a la obtención de su consentimiento podemos comunicarnos con Usted, por correo electrónico, por medio telefónico o por cualquier red social. Si prefiere no recibir comunicaciones a través de alguno o todos estos canales, puede comunicarlo en cualquier momento a servicioalcliente@legal360.com y dejará de recibir dichas comunicaciones. Usted puede acceder a los detalles de la orden de servicio y a los servicios prestados, a través del cual le informemos que tenemos convenio y el estado de cada orden de servicio.<br /> <br />

                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Terceros</h3>
                    <p>
                        Podemos compartir sus datos a terceros para que nos ayuden con cualquiera de las funciones mencionadas en nuestra Política de Privacidad. Por ejemplo, podemos utilizar a terceros para que nos ayuden con los servicios que debemos prestar, a entrega publicidad, recaudar sus pagos, enviar productos o tercerizar nuestros sistemas de servicio al cliente. Podemos intercambiar información con terceros a efectos de protección contra el fraude y la reducción de riesgo de crédito. Los terceros se comprometen a mantener las políticas de privacidad del presente documento para el manejo de sus datos.
                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Responsabilidad limitada</h3>
                    <p>
                        Sin perjuicio de lo consagrado en la legislación colombiana aplicable, LEGAL 360 S.A.S., no asume responsabilidad alguna, por daño o perjuicio derivado de la pérdida de información o utilidades, presencia de virus informáticos resultados del uso o la imposibilidad de usar el material de esta página web.<br /> <br />


                        En caso de que el uso del material de esta página web genere la necesidad de dar servicio, modificar o reparar el equipo o la información, el usuario asume cualquier costo derivado de ello.

                    </p>

                    <h3 className="text-xl font-semibold text-[#e6d769] mt-8">Procedimiento y Trámite de PQRSF</h3>
                    <p>
                        a. Los usuarios de tienen derecho a presentar peticiones, quejas, reclamos, sugerencias, felicitaciones ante LEGAL 360 S.A.S., en forma verbal o escrita.
                        <br /> <br />
                        <ul className="list-disc list-outside pl-5 text-justify text-white leading-relaxed space-y-4 ml-10">
                            <li>
                                El titular de los datos o quien ejerza su representación podrá enviar sus peticiones, quejas, reclamos, sugerencias o felicitaciones en la siguiente dirección física: Carrera 23 N°. 79-09 manzana 25 Barrio Corales. Pereira (Risaralda).
                            </li>

                            <li>
                                Así mismo, podrá radicar virtualmente, peticiones, quejas, reclamos, sugerencias o felicitaciones a través del correo electrónico <strong>servicioalcliente@legal360.co</strong> y podrá contactarnos en la Línea celular <strong>3123240463</strong>.
                            </li>

                            <li>
                                Igualmente, para su comodidad, en este mismo sitio, puedes presentar tus peticiones, quejas, reclamos, sugerencias o felicitaciones, para lo cual es necesario diligenciar el formulario que se encuentra a su disposición para tal fin.
                            </li>
                        </ul>

                    </p>


                    <p>
                        b. Definiciones
                        <br /><br />

                        <span className="text-[#d4af37] inline-block mr-1"><FaCheck /></span>
                        <strong>Petición:</strong> Es el derecho fundamental que tiene toda persona a presentar solicitudes respetuosas a las autoridades respectivas por motivos de interés general o particular y a obtener su pronta resolución. <br /><br />

                        <span className="text-[#d4af37] inline-block mr-1"><FaCheck /></span>
                        <strong>Queja:</strong> Es la manifestación de protesta, insatisfacción, descontento o inconformidad que formula una persona en relación con una conducta o actitud que considera irregular, por parte de quien le atiende dentro de la Institución. <br /><br />

                        <span className="text-[#d4af37] inline-block mr-1"><FaCheck /></span>
                        <strong>Reclamo:</strong> Declaración formal por el incumplimiento de un derecho que ha sido perjudicado o amenazado, ocasionado por la deficiente prestación o suspensión injustificada del servicio por parte de un área o funcionario de esta dentro de la Institución. <br /><br />

                        <span className="text-[#d4af37] inline-block mr-1"><FaCheck /></span>
                        <strong>Sugerencia:</strong> Se entiende por sugerencia, aquella propuesta que formula el usuario del servicio y que tiene como propósito mejorar la prestación del servicio en cualquiera de las áreas académicas o administrativas de la Institución. <br /><br />

                        <span className="text-[#d4af37] inline-block mr-1"><FaCheck /></span>
                        <strong>Felicitación:</strong> Es aquella expresión de satisfacción de un usuario del servicio, con relación a la prestación de un servicio. <br /><br />

                        c. LEGAL 360 S.A.S., en atención a lo contemplado dentro de la Ley 1755 de 2015, las peticiones deberán ser resueltas dentro de los quince (15) días siguientes a su recepción, en cuanto a las peticiones de documentos e información, estos deberán resolverse dentro de los diez (10) días siguientes a su recepción. Las respuestas a las quejas, reclamos, sugerencias y felicitaciones tendrán como tiempo de respuesta los quince (15) días siguientes a la recepción de las mismas a través del mismo medio de atención por el cual fue presentada por el usuario, a menos que este decida que quiere recibirla por otro medio distinto. <br /><br />
                    </p>

                    <p>
                        d. Habeas Data: Señor usuario según las disposiciones legales vigentes usted tiene derecho a radicar ante LEGAL 360 S.A.S., solicitudes de corrección, actualización o retiro de la información personal que haya suministrado.
                    </p>
                    <p>
                        e. Rechazo de PQRSF <br /> <br />


                        Habrá lugar a rechazar la PQRSF que sean presentadas en forma irrespetuosa o desobligante, utilizando amenazas, improperios, insultos, ofensas, afrentas, provocaciones o cualquier otra conducta semejante, de acuerdo a lo establecido en el artículo 19 de la Ley 1955 de 2015.

                    </p>
                    <p>
                        f. Llena los campos obligatorios marcados con un (*) para recibir posteriormente dentro de los términos
                        legales, la respuesta a la petición efectuada.
                    </p>
                </div>




                <div className="bg-white text-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row mt-8">
                    {/* Imagen lateral izquierda con overlay */}
                    <div className="lg:w-1/2 w-full relative flex items-center justify-center">
                        <img
                            src={cristab}
                            alt="Legal 360 Atención al Cliente"
                            className="w-full h-full object-cover "
                        />

                    </div>

                    {/* 
Formulario  */}

                    <form className="bg-white w-full lg:w-[55%] p-6 sm:p-8 border border-gray-200 grid grid-cols-1 gap-4 text-[#001e33] text-sm font-medium">

                        <h2 className="text-2xl font-bold text-center py-4 text-[#001e33]">Formulario PQRSF</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <select className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full">
                                <option value="">Tipo de Documento</option>
                                <option value="CC">C.C</option>
                                <option value="CE">C.E.</option>
                                <option value="PEP">P.E.P.</option>
                                <option value="TI">T.I</option>
                                <option value="NIT">NIT</option>
                            </select>
                            <input type="text" placeholder="Número de Documento*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input type="text" placeholder="Nombre(s) del peticionario*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required />
                            <input type="text" placeholder="Apellido(s) del peticionario*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        </div>

                        <input type="email" placeholder="Correo electrónico de notificación del peticionario*" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        <input type="email" placeholder="Confirmación correo electrónico *" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input type="tel" placeholder="Teléfono de contacto *" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" required />
                            <input type="tel" placeholder="Teléfono adicional" className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full" />
                        </div>

                        <fieldset className="space-y-2">
                            <legend className="block mb-2">Objeto de la solicitud *</legend>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"].map((item) => (
                                    <label key={item} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="objeto"
                                            value={item}
                                            className="accent-[#001e33] w-4 h-4"
                                            required
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </fieldset>



                        <div>
                            <textarea
                                rows="6"
                                maxLength="2000"
                                placeholder="Hechos en los que se fundamenta la petición, solicitud, queja / reclamo o recurso *"
                                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-1 text-justify">
                                Máximo 2.000 caracteres. Si requiere enviar más información, adjunte un archivo.
                            </p>
                        </div>

                        <div>
                            <label className="block mb-1 text-justify">
                                Documentos anexos: (pruebas que se deseen aportar) (Selecciona los archivos y adjúntalos con el botón "Adjuntar")
                            </label>
                            <button
                                type="button"
                                onClick={handleFileClick}
                                className="flex items-center justify-center gap-2 bg-gray-300 text-gray-600 py-2 rounded-md px-4"
                            >
                                <AiOutlinePaperClip className="text-base" />
                                <span>Adjuntar</span>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".jpg,.gif,.png,.doc,.xls,.txt,.pdf,.zip"
                                className="hidden"
                            />
                            <p className="text-xs text-gray-500 mt-1 text-justify">
                                Solo puede anexar archivos con extensión válida y cada archivo no debe superar los 2MB. Evite caracteres especiales en los nombres de archivo.
                            </p>
                        </div>

                        <div className="flex items-start gap-2">
                            <input type="checkbox" required className="mt-1 accent-[#e6d769]" />
                            <label className="text-gray-700 leading-snug text-justify">

                                He leído y autorizo de manera voluntaria e informada a LEGAL 360 S.A.S., para tratar mis datos, acorde con la Política de Tratamiento de Datos Personales, de acuerdo con los fines relacionados con su misiva y funciones, cuyo contenido se encuentra{" "}
                                <Link to="/politica-datos" className="text-blue-600 underline font-medium">
                                    AQUÍ
                                </Link>.

                            </label>
                        </div>

                        <button type="submit" className="w-full bg-[#001e33] hover:bg-[#0b2a4d] text-white py-2 rounded-md font-semibold">
                            Enviar solicitud
                        </button>
                    </form>




                </div>

            </div>
        </section>
    );
};

export default TerminosWeb;
