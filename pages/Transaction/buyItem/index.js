/* eslint-disable @next/next/no-img-element */
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

export default function BuyItem() {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [bank, setBank] = useState();
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    const getUserItems = async () => {
      if (session.data) {
        // cart Items
        console.log(session.data.user);
        const data = await axios
          .post("/api/user/getcart", {
            email: session.data.user.email_address,
            status: 1,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });
        //available payment methods

        const bankdata = await axios
          .post("/api/bank/getbank", {
            email: session.data.user.email_address,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });

        setBank(bankdata.data);
        setCartItems(data.data);
        let totalPrice = 0;
        data.data.forEach((item) => {
          totalPrice += item.itemprice;
        });
        setTotalPrice(totalPrice);
      }
    };
    getUserItems();
  }, [session]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [cvv, setCvv] = useState("");

  const handleBankSelection = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleCvvInput = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedBank, cvv);
    if (selectedBank) {
      bank.forEach((b) => {
        if (b.id === selectedBank) {
          if (b.cvv === cvv) {
            if (b.Amount < totalPrice) {
              alert("Insufficient balance choose another bank");
              router.push("/Transaction/buyItem");
              return;
            } else {
              alert("Payment successful");
              router.push("/Transaction/createBank"); // route to the success page
            }
          } else {
            alert("Invalid CVV");
          }
        }
      });
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
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
                  Total Price: {item.itemprice * item.quantity}
                </h6>
              </div>
            </div>
          ))}
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Total price: ${totalPrice}
        </div>
      </div>
      <div>
        <h2>Select a bank</h2>

        <form onSubmit={handleSubmit}>
          <div
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <FormControl
              variant="outlined"
              sx={{ marginRight: "1rem", minWidth: "250px" }}
            >
              <InputLabel id="bank-select-label">Select a bank</InputLabel>
              <Select
                labelId="bank-select-label"
                id="bank-select"
                value={selectedBank}
                defaultValue=""
                onChange={handleBankSelection}
                label="Select a bank"
              >
                {bank &&
                  bank.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.AccHolderName} - {b.Accountnum}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            {selectedBank && (
              <>
                <TextField
                  id="cvv"
                  label="CVV"
                  variant="outlined"
                  value={cvv}
                  onChange={handleCvvInput}
                  sx={{ marginRight: "1rem" }}
                />
                <Button variant="contained" color="primary" type="submit">
                  Pay
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
