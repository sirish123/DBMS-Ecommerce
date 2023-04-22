import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  TextMolecule,
  NumberMolecule,
  SelectMolecule,
} from "@/components/materialuihelper";
import { useSession } from "next-auth/react";
export default function Sell() {
  const { handleSubmit, control } = useForm();
  const session = useSession();

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
      console.log(session.data.user.email_address)
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
            options={[
              { value: "Electronics", label: "Electronics" },
              { value: "Clothing", label: "Clothing" },
              { value: "Food", label: "Food" },
              { value: "Stationary", label: "Stationary" },
              { value: "Other", label: "Other" },
            ]}
          />

          <button className = "btn btn-primary"type="submit">Add Item</button>
        </form>
      </div>
    </>
  );
}
