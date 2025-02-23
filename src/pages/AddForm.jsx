import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { postApi } from "../features/ApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    price: "",
    description: "",
    category: "",
    rating: "",
    votes: "",
  });

  const [validForm, setValidForm] = useState({
    url: false,
    title: false,
    price: false,
    description: false,
    category: false,
    rating: false,
    votes: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url_err = formData.url == "";
    const title_err = formData.title == "";
    const price_err = isNaN(formData.price) || formData.price == "";
    const desc_err = formData.description == "";
    const category_err = formData.category == "";
    const rating_err =
      isNaN(formData.rating) ||
      formData.rating == "" ||
      formData.rating < 1 ||
      formData.rating > 10;
    const votes_err = isNaN(formData.votes) || formData.votes == "";

    setValidForm({
      url: url_err,
      title: title_err,
      price: price_err,
      description: desc_err,
      category: category_err,
      rating: rating_err,
      votes: votes_err,
    });

    if (
      !url_err &&
      !title_err &&
      !price_err &&
      !desc_err &&
      !category_err &&
      !rating_err &&
      !votes_err
    ) {
      let obj = {
        id: v4(),
        url: formData.url,
        title: formData.title,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        rating: Number(formData.rating),
        votes: Number(formData.votes),
      };
      // axios.post(`http://localhost:3000/products`, obj);

      dispatch(postApi(obj));

      setFormData({
        url: "",
        title: "",
        price: "",
        description: "",
        category: "",
        rating: "",
        votes: "",
      });

      toast.success("Product add successfully...!");

      navigate("/");
    }
  };

  return (
    <div className="py-10 flex flex-col gap-10 px-5">
      <h1 className="text-3xl text-center font-semibold">Add Product Form</h1>
      <div className="flex items-center justify-center py-4">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
          className="border rounded-lg shadow-2xl border-gray-400 py-20 px-10 gap-x-10 gap-y-8 grid grid-cols-1 md:grid-cols-2 w-200"
        >
          <div className="md:col-span-2 flex flex-col">
            <TextField
              id="outlined-number"
              label="Product Image URL *"
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className=""
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.25rem" },
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <span className="mt-1 text-red-500 font-semibold">
              {validForm.url == false
                ? ""
                : "This field is required. Please enter a value. *"}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <TextField
              id="outlined-number"
              label="Product Title *"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className=""
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <span className="mt-1 text-red-500 font-semibold">
              {validForm.title == false
                ? ""
                : "This field is required. Please enter a value. *"}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <TextField
              id="outlined-number"
              label="Product Price *"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="col-span-1"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <span className="mt-1 text-red-500 font-semibold">
              {validForm.price == false ? "" : "Price must be a number. *"}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <TextField
              id="outlined-number"
              label="Product Description *"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-1"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <span className="mt-1 text-red-500 font-semibold">
              {validForm.description == false
                ? ""
                : "This field is required. Please enter a value. *"}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <TextField
              id="outlined-number"
              label="Product Category *"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="col-span-1"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <span className="mt-1 text-red-500 font-semibold">
              {validForm.category == false
                ? ""
                : "This field is required. Please enter a value. *"}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <TextField
              id="outlined-number"
              label="Product Rating *"
              type="text"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="col-span-1"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <span className="mt-1 text-red-500 font-semibold">
              {validForm.rating == false
                ? ""
                : "Rating must be between 1 to 10. *"}
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <TextField
              id="outlined-number"
              label="Product Votes *"
              type="text"
              name="votes"
              value={formData.votes}
              onChange={handleChange}
              className="col-span-1"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <span className="mt-1 text-red-500 font-semibold">
              {validForm.votes == false ? "" : "Votes must be a number. *"}
            </span>
          </div>
          <button
            type="submit"
            className="md:col-span-2 text-white font-semibold text-lg py-3 cursor-pointer bg-blue-700 hover:bg-blue-800"
          >
            Add Product
          </button>
        </Box>
      </div>
    </div>
  );
}

export default AddForm;
