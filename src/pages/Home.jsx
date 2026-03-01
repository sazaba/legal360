import Hero from "./Hero";
import QuienesSomos from "./QuienesSomos";
import Servicios from "./Servicios";
import Footer from "./Footer";
import FormularioPlanes from "./FormularioPlanes";
import ContactoAccesos from "../components/ContactoAccesos";
import PoliticaDatos from "./PoliticaDatos";
import BlogPublicList from "./BlogPublicList";

export default function Home() {
    return (
        // El cambio clave está aquí: bg-[#0c111b] en lugar de bg-white
        <main className="bg-[#0c111b] w-full min-h-screen">
            <section id="top">
                <Hero />
            </section>

            <section id="por-que-nosotros">
                <QuienesSomos />
            </section>

            <section id="servicios">
                <Servicios />
            </section>
            
            <section id="planes">
                <FormularioPlanes />
            </section>
            
            <section id="blog"> {/* Cambié el ID repetido de 'planes' a 'blog' */}
                {/* <BlogPublicList /> */}
            </section>
            
            <ContactoAccesos />
        </main>
    );
}