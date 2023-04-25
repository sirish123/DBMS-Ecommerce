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
          .post("/api/user/returnandbought", {
            email: session.data.user.email_address,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });
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
                Price: {item.itemprice * item.quantity}
              </h6>
              <div>
                {item.status == 2 ? (
                  <Link
                    href={{
                      pathname: "/Transaction/buyItem",
                    }}
                  >
                    <Button variant="contained">Track-Order</Button>
                  </Link>
                ) : item.status == 3 ? (
                  <Link
                    href={{
                      pathname: "/user/singlereturn",
                      query: { message: item.id },
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to return this item?"
                          )
                        ) {
                          changestatus(item.id);
                        }
                      }}
                    >
                      Return
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link
                      href={{
                        pathname: "/user/singlereturn",
                        query: { message: item.id },
                      }}
                    >
                      <Button variant="contained">See Return Status</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
