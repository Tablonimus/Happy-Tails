import React from "react";
import { useSelector } from "react-redux";
import bloqueado from "../../assets/images/bloqueado.jpg"

export default function Messages({ message, own, el }) {

    const yo = useSelector((state) => state.userProfile) // 42b28
    const users = useSelector((state) => state.users)

    const current = users.find(e => e._id === el)

    return (
        <>
            {/* CAJA MADRE CHAT*/}
            <div id="messages" className="flex flex-col space-y-4 p-3">
                {/* CHAT */}
                {own ?
                    <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xl max-w-xs mx-2 order-1 items-end">
                            <div>
                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-yellow-900 text-white ">
                                    {message.text}
                                </span>
                            </div>
                        </div>
                        <img src={yo?.image} alt="My profile" className="w-6 h-6 rounded-full order-2" />
                    </div>
                    : <div className="chat-message">
                        <div className="flex items-end">
                            <div className="flex flex-col space-y-2 text-xl max-w-xs mx-2 order-2 items-start">
                                <div>
                                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                        {message.text}
                                    </span>
                                </div>
                            </div>
                            {
                                current ?
                                    <img src={current?.image} alt="imagen de usuario" className="w-6 h-6 rounded-full order-1" />
                                    :
                                    <img src={bloqueado} alt="Imagen bloqueado" className="w-6 h-6 rounded-full order-1" />
                            }
                        </div>
                    </div>}
            </div>
        </>

    )
}