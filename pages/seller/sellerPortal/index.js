import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { TextMolecule ,NumberMolecule} from "@/components/materialuihelper";
export default function Sell() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
    const newdata = { ...data, itemprice:parseInt(itemprice), phone: "7349359536" };
    addSellerItems(newdata);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextMolecule fieldName="itemname" label="Name of Item" control={control} />
          <NumberMolecule fieldName="itemprice" label="Price of Item" control={control} />
          <TextMolecule fieldName="itemimage" label="Image of Item" control={control} />
          <button type="submit">Check</button>
        </form>
      </div>
    </>
  );
}
