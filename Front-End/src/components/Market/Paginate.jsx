import React from "react";

export default function Paginate ({
    CardsPerPage,
    products,
    nextPag,
    prevPag,
    CurrentPag,
    firstPag,
    lastPag,}) {


    return (
        <nav className="flex">
            <button className="w-full px-4 border-t border-b border-l text-base rounded-l-xl font-semibold text-white bg-amber-600" onClick={firstPag}>First Page</button>
            <button className="w-full px-4 py-2 border-t border-b text-base text-white font-semibold bg-amber-600" disabled={CurrentPag === 1} onClick={prevPag}>Prev</button>
            <button className="w-full px-4 py-2 border-t border-b text-base text-white font-semibold bg-amber-600">{CurrentPag}</button>
            <button className="w-full px-4 py-2 border-t border-b text-base text-white font-semibold bg-amber-600" disabled={CurrentPag === Math.ceil(products / CardsPerPage)} onClick={nextPag}>Next</button>
            <button className="w-full px-4 border-t border-b border-r text-base font-semibold rounded-r-xl text-white bg-amber-600" onClick={lastPag}>Last Page</button>
        </nav>
    )
}