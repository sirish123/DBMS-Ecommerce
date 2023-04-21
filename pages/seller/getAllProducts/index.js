import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

export default function Signup() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const data = await axios
        .get("/api/seller/getallitems")
        .catch((reason) => {
          console.log(reason.response.data);
          return reason.response.data;
        });
      setItems(data.data);
      console.log(data.data);
    };
    getItems();
  }, []);
  const addToCart = async (item) => {
    const data = await axios
      .post("/api/user/addtocart", { email:"cs20b043@iittp.ac.in",itemcode: item, quantity: 1, status: 1 })
      .catch((reason) => {
        console.log(reason.response.data);
        return reason.response.data;
      });
    console.log(data);
    return data;
  };

  return (
    <>
      <div>
        <h1>Items</h1>
        {items &&
          items.map((item) => (
            <div key={item.id}>
              <h2>{item.itemname}</h2>
              <h2>{item.itemprice}</h2>
              <Button onClick={() => addToCart(item.id)}>Add To Cart</Button>
            </div>
          ))}
      </div>
    </>
  );
}
