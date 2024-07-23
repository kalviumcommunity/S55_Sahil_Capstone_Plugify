import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./addForm.css";

function AddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const updatedFormData = {
      ...formData,
    };

    axios
      .post("https://plugify.onrender.com/add", updatedFormData)
      .then(() => {
        console.log("Location added")
        sessionStorage.setItem("locationAdded", "true");
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

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddForm;
