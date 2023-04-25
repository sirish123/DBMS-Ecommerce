import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { SelectMolecule, TextMolecule } from "@/components/materialuihelper";

export default function Signup() {
  const { handleSubmit, control } = useForm();
  const postuserdetails = async (userdata) => {
    const verifier = await axios
      .post("/api/user/getuser", { email: userdata.email, type: userdata.type })
      .catch((reason) => {
        console.log(reason.response.data);
        return reason.response.data;
      });

    if (verifier.data.length > 0) {
      console.log("User already exists");
    } else {
      const data = await axios
        .post("/api/user/postuser", { user: userdata })
        .catch((reason) => {
          console.log(reason.response.data);
          return reason.response.data;
        });
      console.log(data);
      return data;
    }
  };

  const onSubmit = (data) => {
    postuserdetails(data);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextMolecule fieldName="name" label="Name" control={control} />
          <TextMolecule fieldName="email" label="Email" control={control} />
          <TextMolecule
            fieldName="password"
            label="Password"
            control={control}
          />
          <SelectMolecule
            fieldName="type"
            label="Type"
            control={control}
            defaultValue="Buyer"
            options={[
              { value: "Buyer", label: "Buyer" },
              { value: "Seller", label: "Seller" },
              { value: "Advertisor", label: "Advertisor" }
            ]}
          ></SelectMolecule>
          <button type="submit">Check</button>
        </form>
      </div>
    </>
  );
}
