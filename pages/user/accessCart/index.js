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
          <div key={item.id}>
            <h2>{item.id}</h2>
            <h2>{item.itemname}</h2>
            <h2>{item.itemprice}</h2>
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
