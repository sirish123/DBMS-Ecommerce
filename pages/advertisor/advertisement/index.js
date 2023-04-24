import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextMolecule, SelectMolecule } from "@/components/materialuihelper";
import { useSession } from "next-auth/react";

export default function Advertisement() {
  const { handleSubmit, control } = useForm();
  const session = useSession();

  const addAdvertisement = async (advdata) => {
    const data = await axios
      .post("/api/advertisor/advertise", { advdata })
      .catch((reason) => {
        console.log(reason.response.data);
        return reason.response.data;
      });
    console.log(data);
    return data;
  };

  const onSubmit = (data) => {
    if (session) {
      console.log(session.data.user.email_address);
      const newdata = {
        ...data,
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextMolecule
            fieldName="productname"
            label="Name of Item"
            control={control}
          />

          <TextMolecule
            fieldName="imageurl"
            label="Url of Image of Item"
            control={control}
          />

          <SelectMolecule
            fieldName="producttype"
            label="Category of Item"
            control={control}
            defaultValue={"Other"}
            options={options}
          />

          <button className="btn btn-primary" type="submit">
            Add Item
          </button>
        </form>
      </div>
    </>
  );
}
