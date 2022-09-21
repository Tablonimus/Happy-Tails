import React from "react";
import NavBar from "../NavBar/NavBar";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import cachita from "../../assets/images/cachita.png";
import amarillobaño from "../../assets/images/amarillobaño.png";
import carpi from "../../assets/images/carpi.png";
import uno from "../../assets/images/blog-3-1.jpg";
import dos from "../../assets/images/blog-3-2.jpg";
import tres from "../../assets/images/blog-3-3.jpg";
import { Link } from "react-router-dom";

export default function Blog3() {
  return (
    <>
      <NavBar />
      <div className="column w-screen h-full justify-center">
        <div className="h-3/4 w-full bg-yellow-900 flex justify-center ">
          <img src={carpi} alt="" className="w-screen" />
        </div>
        <div className="bg-yellow-900 h-full">
          <div className="flex justify-center p-10">
            <h1 className="text-white text-xl font-semibold">25/02/2022</h1>
          </div>
          <div className="flex">
            <div className="w-3/4 px-20 py-16 flex flex-col gap-24">
              <div>
                <h1 className="text-white text-xl font-semibold">
                  En medio de tanta polémica desatada en medios y redes sociales
                  por la invasión humana que se ha producido a su hábitat
                  natural, especialmente en lo que se conoce como Nordelta, vale
                  la pena saber todo lo necesario a la hora de adoptar uno de
                  estos animalitos, que están de última moda.
                </h1>
              </div>
              <div className="flex gap-10">
                <img src={uno} alt="" width="400px" />
                <h1 className="text-white text-xl font-semibold">
                  En principio, vale advertir que no son aptos para
                  departamentos o, mejor dicho, los departamentos no son aptos
                  para ellos. Hablamos del roedor más grande del mundo que suele
                  pesar hasta 50 kilos en el caso de los machos y más de 60 las
                  hembras. Pero no se trata solo de una cuestión de tamaño: los
                  carpinchos necesitan espacio para ellos y un jardín donde el
                  eventual adoptante pueda instalar una pileta plástica mediana
                  para que se solacen, teniendo en cuenta que morfológicamente
                  están hechos para habitar tanto la superficie como el agua. Y
                  en este sentido cabe subrayar que son muy limpios.
                </h1>
              </div>
              <div className="flex">
                <h1 className="text-white text-xl font-semibold">
                  También hay que tener en cuenta que en la naturaleza viven en
                  manada y solo a los machos puede encontrárselos en soledad.
                  Así, en el caso de querer solo un ejemplar lo que parece más
                  lógico es preferible que sea este último género, que debe ser
                  esterilizado entre los 6 y 9 meses de edad para evitar que se
                  vuelvan adultos agresivos, ya que son territoriales. Los
                  carpinchos son hervíboros: se alimentan de hierbas y en
                  cautiverio comen maíz y toda la variedad imaginable de frutas
                  y verduras; preferiblemente, que contengan vitamina C, ya que
                  no la producen por sí solos. Son propensos a las insolaciones,
                  por lo que necesitan sí o sí el agua y un lugar adecuado donde
                  guarecerse. Además, como con cualquier otra mascota perro o
                  gato, requieren que de vez en cuando los controle el médico
                  veterinario.
                </h1>
                <img src={dos} alt="" width="400px" />
              </div>
              <div className="flex gap-10">
                <img src={tres} alt="" width="400px" />
                <h1 className="text-white text-xl font-semibold">
                  Según los especialistas consultados, se trata animales
                  inteligentes capaces de aprender trucos y actitudes para pedir
                  comida y demostrar afecto, para lo cual disponen además de una
                  amplia gama de sonidos para demostrar hambre, alerta y
                  sumisión, por ejemplo.
                </h1>
              </div>
            </div>
            <div className="w-1/4 px-16 flex flex-col gap-10">
              <div>
                <div className="bg-yellow-600 flex flex-col items-center p-10 gap-3">
                  <h3 className="text-white text-2xl font-semibold">
                    Compartir
                  </h3>
                  <div className="flex">
                    <div className="rounded-full h-16 w-16 flex items-center justify-center overflow-hidden">
                      <FacebookShareButton
                        url={`https://www.happytails.vercel.app/blog/1`}
                        quote={
                          "Miren este blog de Happy Tails, me ayudo mucho!"
                        }
                        hashtag={"#happytails"}
                      >
                        <FacebookIcon size={40} className="rounded-full"/>
                      </FacebookShareButton>
                    </div>
                    <div className="rounded-full h-16 w-16 flex items-center justify-center overflow-hidden">
                      <EmailShareButton
                        subject="Miren este blog de Happy Tails, me ayudo mucho!"
                        body={`https://www.happytails.vercel.app/blog/1`}
                      >
                        <EmailIcon size={40} className="rounded-full"/>
                      </EmailShareButton>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-yellow-600 flex flex-col p-10 gap-10">
                  <h2 className="text-white text-2xl font-semibold">
                    Más popular
                  </h2>
                  <Link to={"/blog/2"}>
                    <div className="flex flex-col items-center gap-3">
                      <img src={amarillobaño} alt="" />
                      <h1 className="font-semibold text-ls">
                        Adopción responsable.
                      </h1>
                    </div>
                  </Link>
                  <Link to={"/blog/1"}>
                    <div className="flex flex-col items-center gap-3">
                      <img src={cachita} alt="" />
                      <h1 className="font-semibold text-ls">
                        Como cuidar a los recién llegados a casa.
                      </h1>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
