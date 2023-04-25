import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextMolecule,
  NumberMolecule,
  SelectMolecule,
} from "@/components/materialuihelper";
import { useSession } from "next-auth/react";

export default function Sell() {
  const options = [
    { value: "Electronics", label: "Electronics" },
    { value: "Clothing", label: "Clothing" },
    { value: "Food", label: "Food" },
    { value: "Stationary", label: "Stationary" },
    { value: "Other", label: "Other" },
    { value: "Beauty", label: "Beauty" },
    { value: "Home goods", label: "Home goods" },
    { value: "Sports equipment", label: "Sports equipment" },
    { value: "Toys and games", label: "Toys and games" },
    { value: "Pet supplies", label: "Pet supplies" },
    { value: "Books and magazines", label: "Books and magazines" },
    { value: "Jewelry", label: "Jewelry" },
    { value: "Health and wellness", label: "Health and wellness" },
    { value: "Automotive", label: "Automotive" },
    { value: "Furniture", label: "Furniture" },
    { value: "Art and craft supplies", label: "Art and craft supplies" },
    { value: "Party and event supplies", label: "Party and event supplies" },
    { value: "Musical instruments", label: "Musical instruments" },
    { value: "Travel accessories", label: "Travel accessories" },
    { value: "Office equipment", label: "Office equipment" },
  ];

  const { handleSubmit, control } = useForm();
  const session = useSession();
  const [bank, setBank] = useState();
  useEffect(() => {
    const getbankdata = async () => {
      if (session.data) {
        const bankdata = await axios
          .post("/api/bank/getbank", {
            email: session.data.user.email_address,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });

        const options = bankdata.data.map((b) => ({
          value: b.id,
          label: `${b.accholdername} - ${b.accountnum}`,
        }));
        setBank(options);
      }
    };
    getbankdata();
  }, [session]);

  const addSellerItems = async (selleritemdata) => {
    const data = await axios
      .post("/api/seller/postselleritem", { selleritem: selleritemdata })
      .catch((reason) => {
        console.log(reason.response.data);
        return reason.response.data;
      });
    console.log(data);
    return data;
  };

  const onSubmit = (data) => {
    const itemprice = data.itemprice;
    const quantity = data.quantity;
    if (session) {
      console.log(session.data.user.email_address);
      const newdata = {
        ...data,
        itemprice: parseInt(itemprice),
        quantity: parseInt(quantity),
        email: session.data.user.email_address,
      };
      addSellerItems(newdata);
    }
  };
  return (
    <>
      {bank && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextMolecule
              fieldName="itemname"
              label="Name of Item"
              control={control}
            />
            <NumberMolecule
              fieldName="itemprice"
              label="Price of Item"
              control={control}
            />
            <NumberMolecule
              fieldName="quantity"
              label="Number of Items in Inventory"
              control={control}
            />
            <TextMolecule
              fieldName="itemimage"
              label="Url of Image of Item"
              control={control}
            />
            <TextMolecule
              fieldName="contact"
              label="Contact Number of Seller"
              control={control}
            />
            <SelectMolecule
              fieldName="producttype"
              label="Category of Item"
              control={control}
              defaultValue={"Other"}
              options={options}
            />
            <SelectMolecule
              fieldName="bankid"
              label="Choose Bank Account For Deposit"
              control={control}
              defaultValue={"Other"}
              options={bank}
            />

            <button className="btn btn-primary" type="submit">
              Add Item
            </button>
          </form>
        </div>
      )}
    </>
  );
}
