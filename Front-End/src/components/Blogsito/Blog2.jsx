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
import uno from "../../assets/images/blog-2-1.jpg";
import dos from "../../assets/images/blog-2-2.jpg";
import tres from "../../assets/images/blog-2-4.jpg";
import { Link } from "react-router-dom";

export default function Blog2() {
  return (
    <>
      <NavBar />
      <div className="column w-screen h-full justify-center">
        <div className="h-3/4 w-full bg-yellow-900 flex justify-center ">
          <img src={amarillobaño} alt="" className="w-screen" />
        </div>
        <div className="bg-yellow-900 h-full">
          <div className="flex justify-center p-10">
            <h1 className="text-white text-xl font-semibold">13/07/2022</h1>
          </div>
          <div className="flex">
            <div className="w-3/4 px-20 py-16 flex flex-col gap-24">
              <div>
                <h1 className="text-white text-xl font-semibold">
                  Adoptar una mascota traerá muchos cambios positivos para tu
                  vida. A través de la historia, las mascotas han sido grandes
                  compañeras de la vida de las personas, compartiendo alegrías,
                  pero también ayudando a superar momentos difíciles.
                </h1>
              </div>
              <div className="flex gap-10">
                <img src={uno} alt="" width="400px" />
                <h1 className="text-white text-xl font-semibold">
                  Adoptar es un gran paso. Hay muchos aspectos que debes
                  considerar previamente, desde elegir el tipo de mascota más
                  adecuada para tu estilo de vida, hasta decidir dónde o con
                  quién adoptar. Por eso queremos ayudarte para que ésta sea una
                  de las mejores experiencias en tu vida y la de tu próximo
                  amigo de cuatro patas. Ante todo, debes tomar en cuenta la
                  gran responsabilidad que representa tener a un animal de
                  compañía dentro de tu vida, ya que desafortunadamente es común
                  que algunos dueños que adquieren un cachorro o un gatito, de
                  forma impulsiva decidan abandonarlo. Esto sucede por lo
                  regular cuando se dan cuenta del compromiso a largo plazo que
                  implica vivir con una mascota.
                </h1>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex items-center">
                  <img src={dos} alt="" width="700" />
                  <h1 className="text-white text-2xl font-semibold pl-20">
                    Beneficios de adoptar un perro
                  </h1>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-white text-xl font-semibold">
                    No hay nada mejor que un largo paseo con tu amigo de cuatro
                    patas en una fresca mañana de primavera, ver la alegría de
                    su cara cuando tomas una pelota y se da cuenta de que es
                    hora de ir al parque a jugar o estar en casa es más
                    relajante con su compañía.
                  </h1>
                  <h1 className="text-white text-sl font-semibold">
                    Se dice y es totalmente cierto, que las mascotas y los
                    perros devuelven el amor que se les da multiplicado por
                    diez. Antes de salir corriendo a buscar un perro, es
                    importante que lo pienses con detenimiento. Puede ser un
                    trabajo duro y es un compromiso de por vida, ya que tu perro
                    dependerá de ti durante muchos años. Cuando estés seguro de
                    disponer del tiempo y del tipo de vida que te permita tener
                    un perro, y después de haberte informado sobre las
                    diferentes razas y personalidades de cada uno, será el
                    momento de conocer todos los beneficios de tener un perro.
                  </h1>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex items-center">
                  <h1 className="text-white text-2xl font-semibold pr-20">
                    Beneficios de adoptar un gato
                  </h1>
                  <img src={tres} alt="" width="700px" />
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-white text-xl font-semibold">
                    Los estudios demuestran que las personas con animales de
                    compañía suelen estar más sanas y felices que aquellas que
                    no los tienen, además, sabemos lo maravilloso que es volver
                    a casa al final de un duro día y escuchar el ronroneo de
                    satisfacción de una adorable bola de pelo; es por ello que
                    no tenemos duda de que los gatos son grandes mascotas, pero
                    también una gran responsabilidad y un compromiso de por
                    vida.
                  </h1>
                  <h1 className="text-white text-sl font-semibold">
                    Se ha comprobado que tener un gato reduce el estrés y son
                    grandes compañeros para quienes se sienten tristes o
                    deprimidos. Normalmente los dueños de gatos tienen la
                    presión arterial más baja que las personas sin mascotas. Tu
                    sistema inmunológico estará más fuerte y esto te permitirá
                    recuperarte de las enfermedades antes que las personas que
                    no tienen animales de compañía. Por lo general, los niños
                    que crecen con gatos se enferman menos, que aquellos que no
                    tienen mascotas. Son muy cariñosos y tienen un gran
                    carácter, pero también valoramos su independencia, es decir,
                    necesitan menos cuidados que otras mascotas. Los gatos
                    pueden ayudar a las personas a recuperarse más rápido de un
                    trauma emocional, como el fallecimiento de un ser querido.
                  </h1>
                  <h1 className="text-white text-sl font-semibold">
                    Tener un gato te brinda diversos beneficios, pero es
                    importante elegirlo detenidamente para asegurarte de que te
                    adaptarás bien a tu esponjoso amigo. El gato ideal dependerá
                    de tu estilo de vida y de tus preferencias personales. Por
                    ejemplo, es posible que quieras un gato adulto al que poder
                    acariciar en tu regazo o que tengas en mente un minino de
                    una raza en particular. Toma en cuenta si lo quieres con
                    pedigrí o no, si quieres un macho o una hembra.
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-1/4 px-16 flex flex-col gap-10">
              <div>
                <div className="bg-yellow-600 flex flex-col items-center p-10 gap-3">
                  <h3 className="text-white text-2xl font-semibold">
                    Compartir
                  </h3>
                  <div className="flex">
                    <div className="rounded-lg h-16 w-16 flex items-center justify-center overflow-hidden">
                      <FacebookShareButton
                        url={`https://www.happytails.vercel.app/blog/1`}
                        quote={
                          "Miren este blog de Happy Tails, me ayudo mucho!"
                        }
                        hashtag={"#happytails"}
                      >
                        <FacebookIcon size={40} className="rounded-full" />
                      </FacebookShareButton>
                    </div>
                    <div className="rounded-lg h-16 w-16 flex items-center justify-center overflow-hidden">
                      <EmailShareButton
                        subject="Miren este blog de Happy Tails, me ayudo mucho!"
                        body={`https://www.happytails.vercel.app/blog/1`}
                      >
                        <EmailIcon size={40} className="rounded-full" />
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
                  <Link to={"/blog/1"}>
                    <div className="flex flex-col items-center gap-3">
                      <img src={cachita} alt="" />
                      <h1 className="font-semibold text-ls">
                        Como cuidar a los recién llegados a casa.
                      </h1>
                    </div>
                  </Link>
                  <Link to={"/blog/3"}>
                    <div className="flex flex-col items-center gap-3">
                      <img src={carpi} alt="" />
                      <h1 className="font-semibold text-ls">
                        Los carpinchos como mascota.
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
