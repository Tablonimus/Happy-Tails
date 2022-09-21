import React from "react";
import { Footer } from "flowbite-react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
export default function FooterComponent() {
  return (
    <Footer container={true}>
      <div>
        <Footer.Title title="Compartir" />
        <Footer.LinkGroup>
          <Footer.Link href="#">
            {" "}
            <div className="rounded-full">
              <FacebookShareButton
                url={`https://happytails.vercel.app`}
                quote={"Happy Tails"}
                hashtag={"#happytails"}
              >
                <FacebookIcon size={40} className="rounded-full" />
              </FacebookShareButton>
            </div>
          </Footer.Link>
          <Footer.Link href="#">
            <div>
              <EmailShareButton
                subject="Quiero que me adoptes"
                body={`Seguinos en https://happytails.vercel.app`}
              >
                <EmailIcon size={40} className="rounded-full" />
              </EmailShareButton>
            </div>
          </Footer.Link>
        </Footer.LinkGroup>
      </div>

      <Footer.LinkGroup>
        <Footer.Link href="https://happytails.vercel.app/about">Sobre nosotros</Footer.Link>
      </Footer.LinkGroup>
      <Footer.LinkGroup>
        <Footer.Link href="#">Ir Arriba</Footer.Link>
      </Footer.LinkGroup>
      <Footer.LinkGroup>
        <Footer.Link href="#">Centro de denuncias</Footer.Link>
      </Footer.LinkGroup>
      <Footer.Copyright by="Blancaflor y los 7 hooksitos™" year={2022} />
    </Footer>
  );
}
