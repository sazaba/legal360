
import Slider from "../components/Slider";
import Footer from "./Footer";
import Hero from "./Hero";

import PorQueNosotros from "./PorQueNosotros";
import QuienesSomos from "./QuienesSomos";
import Servicios from "./Servicios";

export default function Home() {
    return (
        <main>

            <Hero />
            <QuienesSomos />
            <Servicios id="servicios" />
            {/* <PorQueNosotros /> */}
            <Footer />
            {/* <Slider /> */}
        </main>
    );
}
