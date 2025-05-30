
import Slider from "../components/Slider";
import Hero from "./Hero";

// En Home.jsx
import QuienesSomos from "./QuienesSomos";
import Servicios from "./Servicios";
import Footer from "./Footer";
import FormularioPlanes from "./FormularioPlanes";
import ContactoAccesos from "../components/ContactoAccesos";
import PoliticaDatos from "./PoliticaDatos";

export default function Home() {
    return (
        <main>
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
            <ContactoAccesos />
        </main>
    );
}
