import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { TextMolecule } from "@/components/materialuihelper";
import { useRouter } from "next/router";

export default function Cart() {
  const { handleSubmit, control } = useForm();
  const session = useSession();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const postbankdetails = async (bankdata) => {
    if (session.data) {
      const data = await axios
        .post("/api/bank/postbank", { Bankdetails: bankdata })
        .catch((reason) => {
          console.log(reason.response.data);
          return reason.response.data;
        });
      console.log(data);
      return data;
    }
  };

  const onSubmit = async (data) => {
    if (session.data) {
      const num = Math.ceil(Math.random() * 1000000);
      const bankdata = {
        ...data,
        Amount: num,
        email: session.data.user.email_address,
      };
      const result = await postbankdetails(bankdata);
      if (result) {
        setIsSuccess(true);
      }
    }
  };

  const handleRedirect = () => {
    router.push("/Transaction/buyItem");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              padding: "20px",
            }}
          >
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
              <TextMolecule
                fieldName="AccHolderName"
                label="Account Holder Name"
                control={control}
              />
              <TextMolecule
                fieldName="Accountnum"
                label="Account Number"
                control={control}
              />
              <TextMolecule fieldName="cvv" label="Cvv" control={control} />

              {isSuccess ? (
                <div>
                  <p>Account added successfully!</p>
                  <button className="btn btn-primary" onClick={handleRedirect}>
                    Proceed to Checkout
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary" type="submit">
                  Add Account
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
