import { AiOutlineMail, AiOutlineMessage } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import logowhitebg from '../assets/images/logowhitebg.webp';

const ContactoAccesos = () => {
    return (
        <section className="w-full bg-white py-4 px-4 sm:px-6 lg:px-12 font-roboto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 items-center gap-6 sm:gap-10">

                {/* Columna del logo */}
                <div className="flex justify-center sm:justify-start">
                    <img
                        src={logowhitebg}
                        alt="Legal 360 Logo"
                        className="w-[130px] sm:w-[160px] object-contain"
                    />
                </div>

                {/* Columna derecha: íconos de contacto */}
                <div className="w-full flex justify-center sm:justify-end gap-4 sm:gap-6">
                    {/* Tarjeta 1: Llámanos */}
                    <div className="flex flex-col items-center">
                        <div className="bg-[#001e33] p-2 sm:p-3 rounded-full shadow-md">
                            <BsFillTelephoneFill className="text-[#e6d769] text-xl sm:text-2xl" />
                        </div>
                        <p className="mt-2 text-[#1d1d1b] font-medium text-xs sm:text-sm">LLÁMANOS</p>
                    </div>

                    {/* Tarjeta 2: Chatea */}
                    <div className="flex flex-col items-center">
                        <div className="bg-[#001e33] p-2 sm:p-3 rounded-full shadow-md">
                            <AiOutlineMessage className="text-[#e6d769] text-xl sm:text-2xl" />
                        </div>
                        <p className="mt-2 text-[#1d1d1b] font-medium text-xs sm:text-sm">CHATEA</p>
                    </div>

                    {/* Tarjeta 3: Email */}
                    <div className="flex flex-col items-center">
                        <div className="bg-[#001e33] p-2 sm:p-3 rounded-full shadow-md">
                            <AiOutlineMail className="text-[#e6d769] text-xl sm:text-2xl" />
                        </div>
                        <p className="mt-2 text-[#1d1d1b] font-medium text-xs sm:text-sm">EMAIL</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactoAccesos;
