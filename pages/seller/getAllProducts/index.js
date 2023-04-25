/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function GetAllProducts() {
  const [items, setItems] = useState([]);
  const session = useSession();
  
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

  const addToCart = async (item, quantity) => {
    if (quantity <= item.quantity) {
      const data = await axios
        .post("/api/user/addtocart", {
          email: session.data.user.email_address,
          itemcode: item.id,
          quantity: quantity,
          status: 1,
        })
        .catch((reason) => {
          console.log(reason.response.data);
          return reason.response.data;
        });
      console.log(data);
      return data;
    } else {
      console.log(`Only ${item.quantity} available`);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items &&
          items.map((item) => (
            <div className="card-wrapper" key={item.id}>
              <div className="card">
                <img
                  src={item.itemimage}
                  className="card-img-top"
                  alt=""
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.itemname}</h5>
                  <p className="card-text">{item.itemprice}</p>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      max={item.itemquantity}
                      defaultValue="1"
                      aria-label="Quantity"
                      aria-describedby="button-addon2"
                      style={{ maxWidth: "70px", marginRight: "5px" }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        addToCart(item, parseInt(Event.target.previousSibling.value))
                      }
                      id="button-addon2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
