

import Hero from "./Hero";

// En Home.jsx
import QuienesSomos from "./QuienesSomos";
import Servicios from "./Servicios";
import Footer from "./Footer";
import FormularioPlanes from "./FormularioPlanes";
import ContactoAccesos from "../components/ContactoAccesos";
import PoliticaDatos from "./PoliticaDatos";
import BlogPublicList from "./BlogPublicList";

export default function Home() {
    return (
        <main className="bg-white">
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
            <section id="planes">
                <BlogPublicList />
            </section>
            <ContactoAccesos />
        </main>
    );
}
