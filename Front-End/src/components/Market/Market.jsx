import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import ProductCard from "./ProductCard";
import FooterComponent from "../FooterComponent";
import { Link } from "react-router-dom";
import Paginate from "./Paginate";
import { useState } from "react";
import MarketSideBar from "./MarketSideBar";
import SideBarProducto from "../NavBar/SideBarProducto";

export default function Market() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [CurrentPag, setCurrentPage] = useState(1);
  const [CardsPerPage, setCardsPerPage] = useState(6);
  const TotalPages = Math.ceil(products.length / CardsPerPage);

  const nextPag = () => {
    setCurrentPage(CurrentPag + 1);
  };

  const prevPag = () => {
    if (CurrentPag !== 1) setCurrentPage(CurrentPag - 1);
  };

  const firstPag = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(TotalPages);
  };

  const IndexLastCard = CurrentPag * CardsPerPage;

  const IndexFirstCard = IndexLastCard - CardsPerPage;

  const CurrentCards = products.slice(IndexFirstCard, IndexLastCard);

  return (
    <section className="flex flex-col h-full items-center justify-between">
      <NavBar />
      <div className="mb-8 lg:mb-5">
        <MarketSideBar setCurrentPage={setCurrentPage} />
      </div>
      <div className="w-1/4 flex flex-col justify-center items-center">
        <SideBarProducto />
      </div>

      <div className="flex flex-col justify-center items-center w-screen">
        {CurrentCards?.map((d) => (
          <ProductCard
            id= {d._id}
            name={d.name}
            image={d.image}
            price={d.price}
            stock={d.stock}
          />
        ))}
      </div>
      <div className="flex justify-center mt-5 mb-5">
        <Paginate
          CardsPerPage={CardsPerPage}
          products={products.length}
          CurrentPag={CurrentPag}
          setCurrentPage={setCurrentPage}
          firstPag={firstPag}
          prevPag={prevPag}
          nextPag={nextPag}
          lastPag={lastPage}
        ></Paginate>
      </div>
      <FooterComponent />
    </section>
  );
}
