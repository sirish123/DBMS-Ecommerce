/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AccessCart() {
  const router = useRouter();
  const { message } = router.query;
  const [cartItems, setCartItems] = useState([]);
  const session = useSession();
  useEffect(() => {
    const getUserItems = async () => {
      if (session.data) {
        const data = await axios
          .post("/api/user/returnandbought", {
            status1: 4,
            status2: 5,
            status2: 6,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });
        data.data.forEach((key) => {
          if (key.id === message) {
            setCartItems([key]);
          }
        });
      }
    };
    getUserItems();
  }, [session, message]);

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
                Price: {item.itemprice * item.quantity}
              </h6>
            </div>
          </div>
        ))}
    </>
  );
}
