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
import uno from "../../assets/images/blog-1-1.jpg";
import dos from "../../assets/images/blog-1-2.jpg";
import tres from "../../assets/images/blog-1-3.jpg";
import { Link } from "react-router-dom";

export default function Blog1() {
  return (
    <>
      <NavBar />
      <div className="column w-screen h-full justify-center">
        <div className="h-3/4 w-full bg-yellow-900 flex justify-center ">
          <img src={cachita} alt="" className="w-screen" />
        </div>
        <div className="bg-yellow-900 h-full">
          <div className="flex justify-center p-10">
            <h1 className="text-white text-xl font-semibold">2/09/2022</h1>
          </div>
          <div className="flex">
            <div className="w-3/4 px-20 py-16 flex flex-col gap-24">
              <div>
                <h1 className="text-white text-xl font-semibold">
                  Llega un cachorro a casa: sea bienvenido! Esta es una gran
                  notícia que hace que toda la familia esté contenta y alegre,
                  pero es muy importante que hagamos las cosas que tocan para
                  que la recepción y adaptación del cachorro sea los más
                  agradable posible. Lee atentamente y dale mucho cariño a tu
                  perro con estos consejos será fácil.
                </h1>
              </div>
              <div className="flex gap-10">
                <img src={uno} alt="" width="400px" />
                <h1 className="text-white text-xl font-semibold">
                  Lo primero que tenemos que tener en cuenta para que nuestro
                  cachorro esté bien es que le debemos tratar con la máxima
                  dulzura, hablándole lentamente y siempre de la misma forma. No
                  le asustes ni le grites. Piensa que el pequeñito cachorro
                  acaba de dejar a su madre y a sus hermanos, y que ustedes para
                  él son unos seres desconocidos, muy grande con dos piernas
                  largas y dos brazos larguísimos que intentan agarrarlo.
                </h1>
              </div>
              <div className="flex">
                <h1 className="text-white text-xl font-semibold">
                  Otra cosa muy importante que hay que tener en cuenta: el
                  cachorro es como un niño muy pequeño y necesita sus horas de
                  sueño y descanso entre un juego y otro y entre comidas. Tienes
                  que tener en cuenta que el cachorro no tiene aún suficiente
                  energia para jugar mucho rato. En cuanto a la comida que debes
                  darle a tu cachorro, es mejor que te lo diga el veterinario,
                  al que conviene alimentarlo con arroz hervido con carne
                  picada, cuatro o cinco veces al día.
                </h1>
                <img src={dos} alt="" width="400px" />
              </div>
              <div className="flex gap-10">
                <img src={tres} alt="" width="400px" />
                <h1 className="text-white text-xl font-semibold">
                  Ten cuidado con las cortinas, tapizados y sillones. Poco a
                  poco tienes que enseñarle que no los tiene que tocar jamás. No
                  le pegués, decile solamente: ¡No! Después de esto los
                  obedecerá dócilmente. Es muy importante, enseñarle a su
                  cachorro a respetar, desde el primer momento. Hasta que el
                  cachorro no haya aprendido hacer sus necesidades acostumbrale
                  hacerlo en una hoja de periódico puesta en el balcón o el
                  jardín. Su cachorro aprenderá a ir siempre a hacer las
                  necesidades en la hoja de papel. Después para hacerles
                  entender, levantará la pierna cuando tenga los 6 o 7 meses de
                  edad. Es importante en el cuidado del cachorro que le eduquen
                  para que se integre en su familia.
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
                        subject="Mira este blog de Happy Tails, me ayudo mucho!"
                        body={`https://www.happytails.vercel.app/blog/1 Como cuidar correctamente a los recien llegados a casa`}
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
                  <Link to={"/blog/2"}>
                    <div className="flex flex-col items-center gap-3">
                      <img src={amarillobaño} alt="" />
                      <h1 className="font-semibold text-ls">
                        Adopción responsable.
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
