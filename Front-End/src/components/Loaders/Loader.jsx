import React from "react";
import { Spinner } from "flowbite-react";

export default function Loader() {

    return <>
        <div className="text-center m-10">
            <Spinner
                color="warning"
                size="xl"
            />
        </div>
    </>
}