import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "../../ListingPage/AddEntity/addForm.css";

function UpdateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the existing data for the specific item by ID
    axios
      .get(`https://plugify.onrender.com/cards/${id}`)
      .then((res) => {
        const playerData = res.data;
        // Set the fetched data to the form fields
        setValue("img_url", playerData.img_url);
        setValue("contact_no", playerData.contact_no);
        setValue("price_per_min", playerData.price_per_min);
        setValue("google_maps_link", playerData.google_maps_link);
        setValue("charge_type", playerData.charge_type);
      })
      .catch((error) => console.error(error));
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    const updatedFormData = {
      ...formData,
      created_by: sessionStorage.getItem("username"),
    };

    axios
      .put(`https://plugify.onrender.com/updateCard/${id}`, updatedFormData)
      .then(() => {
        console.log("Location updated");
        localStorage.setItem("locationUpdated", true);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="addform-container">
      <form className="addform" onSubmit={handleSubmit(onSubmit)}>
        <label className="add-form-label">Img Url:</label>
        <input
          type="text"
          {...register("img_url", {
            required: true,
            pattern: /^https?:\/\/.+/,
          })}
        />
        {errors.img_url && (
          <p className="add-error">
            Valid url starts with "http://" or "https://"
          </p>
        )}

        <label className="add-form-label">Contact:</label>
        <input
          type="tel"
          {...register("contact_no", {
            required: true,
            pattern: /^[0-9]{10}$/,
          })}
        />
        {errors.contact_no && <p className="add-error">Contact is required</p>}

        <label className="add-form-label">Price/min:(Rupees)</label>
        <input
          type="number"
          {...register("price_per_min", { required: true })}
        />
        {errors.price_per_min && (
          <p className="add-error">Price/min is required</p>
        )}

        <label className="add-form-label">Google Maps Url:</label>
        <input
          type="text"
          {...register("google_maps_link", {
            required: true,
            pattern: /^https?:\/\/.+/,
          })}
        />
        {errors.google_maps_link && (
          <p className="add-error">
            Valid url starts with "http://" or "https://"
          </p>
        )}

        <label className="add-form-label">Charge Type:</label>
        <input type="text" {...register("charge_type", { required: true })} />
        {errors.charge_type && (
          <p className="add-error">Charge Type is required</p>
        )}

        <label className="add-form-label">Pincode:</label>
        <input
          type="text"
          {...register("pin_code", {
            required: "Pincode is required",
            pattern: {
              value: /^[1-9][0-9]{5}$/,
              message: "Invalid pincode. It should be a 6-digit number.",
            },
          })}
        />
        {errors.pin_code && (
          <p className="add-error">{errors.pin_code.message}</p>
        )}

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateForm;
