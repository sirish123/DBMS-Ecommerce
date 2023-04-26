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

  const postwarehouse = async (warehousedata) => {
    if (session.data) {
      const data = await axios
        .post("/api/mongo/warehouse", warehousedata)
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
      const warehousedata = {
        ...data,
        email: session.data.user.email_address,
      };
      const result = await postwarehouse(warehousedata);
      if (!result.data.error) {
        setIsSuccess(true);
      }
    }
  };

  const handleRedirect = () => {
    router.push("/admin/createwarehouse");
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
                fieldName="wnumber"
                label="Warehouse number"
                control={control}
              />
              <TextMolecule
                fieldName="wname"
                label="Warehouse Name"
                control={control}
              />
              <TextMolecule
                fieldName="address"
                label="Warehouse Address"
                control={control}
              />
              <TextMolecule
                fieldName="pincode"
                label="Warehouse pincode"
                control={control}
              />
              {isSuccess ? (
                <div>
                  <p>Warehouse Added Successfully</p>
                  <button className="btn btn-primary" onClick={handleRedirect}>
                    Create Another Warehouse
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary" type="submit">
                  Create Warehouse
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
