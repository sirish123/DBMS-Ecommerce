import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { SelectMolecule, NumberMolecule } from "@/components/materialuihelper";
import { useSession } from "next-auth/react";

export default function Advertisement() {
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
  const addAdvertisement = async (advdata) => {
    const data = await axios
      .post("/api/advertisor/coupon", { advdata })
      .catch((reason) => {
        console.log(reason.response.data);
        return reason.response.data;
      });
    console.log(data);
    return data;
  };

  const onSubmit = (data) => {
    const quantity = data.quantity;
    const percent = data.percent;
    const num = Math.ceil(Math.random() * 10000);
    const couponcode = data.producttype.substring(0, 2) + num.toString();

    if (session) {
      console.log(session.data.user.email_address);
      const newdata = {
        ...data,
        quantity: parseInt(quantity),
        percent: parseInt(percent),
        couponcode: couponcode,
        email: session.data.user.email_address,
      };
      addAdvertisement(newdata);
    }
  };
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

  return (
    <>
      {bank && <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NumberMolecule
            fieldName="percent"
            label="Discount Percentag(1% to 100%)"
            control={control}
          />

          <NumberMolecule
            fieldName="quantity"
            label="Valid for 'X amount of items"
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
      </div>}
    </>
  );
}
