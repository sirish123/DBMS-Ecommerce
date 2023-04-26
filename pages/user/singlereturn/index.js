/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { TextMolecule } from "@/components/materialuihelper";

export default function AccessCart() {
  const router = useRouter();
  const { message } = router.query;
  const { handleSubmit, control } = useForm();
  const [cartItems, setCartItems] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const session = useSession();
  useEffect(() => {
    const getUserItems = async () => {
      if (session.data) {
        const data = await axios
          .post("/api/user/returnandbought", {
            email: session.data.user.email_address,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });
        const wdata = await axios
          .get("/api/mongo/warehouse")
          .catch((reason) => {
            console.log(reason.response.data);
          });
        const randomIndex = Math.floor(
          Math.random() * wdata.data.warehouses.length
        );
        setWarehouse(wdata.data.warehouses[randomIndex]);
        console.log(wdata.data.warehouses[randomIndex]);

        data.data.forEach((key) => {
          if (key.id === message) {
            setCartItems([key]);
          }
        });
      }
    };
    getUserItems();
  }, [session, message]);

  const filegrivance = async (data) => {
    if (session.data) {
      const filedata = await axios
        .post("/api/mongo/grievance", {
          ...data,
          email: session.data.user.email_address,
          userid: message,
        })
        .catch((reason) => {
          console.log(reason.response.data);
        });
      console.log(filedata);
    }
  };
  const changestatus = async (id) => {
    const data = await axios
      .post("/api/user/singletransaction", {
        id: id,
        status: 3,
      })
      .catch((reason) => {
        console.log(reason.response.data);
      });
    console.log(data.data);
  };
  const onSubmit = async (data) => {
    if (session.data) {
      filegrivance(data);
    }
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
              {item.status === 4 ? (
                <h1>Return is under review</h1>
              ) : item.status === 6 ? (
                <h1>Return is approved Refund in Process</h1>
              ) : item.status === 5 ? (
                <div>
                  <h1>Return is rejected Seller Contact: {item.contact}</h1>
                  <h1>File a Grievance</h1>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextMolecule
                      fieldName="grievance"
                      label="Enter your Problem here"
                      control={control}
                    />
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              ) : (
                <h1>
                  Your product has dispatched from
                  {warehouse && (
                    <div>
                      <h2>{warehouse.wname}</h2>
                      <h2>{warehouse.address}</h2>
                    </div>
                  )}
                     <Link
                    href={{
                      pathname: "/user/returnsandorders",
                    }}
                  >
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      changestatus(message);
                    }}
                  >
                    Receive product
                  </button>
                  </Link>
                </h1>
              )}
            </div>
          </div>
        ))}
    </>
  );
}
