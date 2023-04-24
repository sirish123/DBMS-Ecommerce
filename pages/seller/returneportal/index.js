/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function AccessCart() {
  const [cartItems, setCartItems] = useState();
  const session = useSession();

  useEffect(() => {
    const getUserItems = async () => {
      if (session.data) {
        console.log(session.data.user);
        const data = await axios
          .post("/api/seller/returnitems", {
            email: session.data.user.email_address,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });
          console.log(data)
        setCartItems(data.data);
      }
    };
    getUserItems();
  }, [session]);
  const changestatus = async (id) => {
    const data = await axios
      .post("/api/user/singletransaction", {
        id: id,
        status: 4,
      })
      .catch((reason) => {
        console.log(reason.response.data);
      });
    setCartItems(data.data);
    console.log(data.data);
  };
  return (
    <>
      {cartItems &&
        cartItems.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{ width: "18rem", margin: "10px" }}
          >
            <div className="card-body">
              <img
                src={item.itemimage}
                className="card-img-top"
                alt=""
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              <h5 className="card-title mb-2 ">{item.itemname}</h5>
              <h6 className="card-text mb-2 ">Quantity: {item.quantity}</h6>
              <h6 className="card-text mb-2 ">
                Price: {item.itemprice}
              </h6>
            </div>
          </div>
        ))}
    </>
  );
}
