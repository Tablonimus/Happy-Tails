import React from "react";
import { useSelector } from "react-redux";
import bloqueado from "../../assets/images/bloqueado.jpg"

export default function Cabecera({ el }) {

  const users = useSelector((state) => state.users)

  const current = users.find(e => e._id === el.toString())

  return (
    <div className="w-full h-16 bg-gray-200 shadow-sm shadow-slate-500">
      <div className="flex items-center">
        <div className="p-3">{
          current ?
            <img src={current?.image} alt="imagen de usuario" className="h-8 w-8 rounded-full" />
            :
            <img src={bloqueado} alt="Imagen bloqueado" className="h-8 w-8 rounded-full" />
        }
        </div>
        <div className="p-3">
          <div className="flex justify-center items-center font-semibold text-gray-900">
            {current ? current?.first_name + " " + current?.last_name : "Usuario eliminado"}
          </div>
        </div>
      </div>
    </div>
  );
}