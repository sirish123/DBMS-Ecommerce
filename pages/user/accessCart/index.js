/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
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
          .post("/api/user/getcart", {
            email: session.data.user.email_address,
            status: 1,
          })
          .catch((reason) => {
            console.log(reason.response.data);
            return reason.response.data;
          });
        setCartItems(data.data);
        console.log(data.data);
        return data;
      }
    };
    getUserItems();
  }, [session]);

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
              <h6 className="card-text mb-2 ">
                Quantity: {item.quantity}
              </h6>
              <h6 className="card-text mb-2 ">
               Price: {item.itemprice * item.quantity}
              </h6>
            </div>
          </div>
        ))}
      <div>
        <Link
          href={{
            pathname: "/Transaction/buyItem",
            query: { message: { cartItems } },
          }}
        >
          <Button variant="contained">Proceed to Checkout</Button>
        </Link>
      </div>
    </>
  );
}
