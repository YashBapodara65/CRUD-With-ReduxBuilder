import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { editApi } from "../features/ApiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [formData, setFormData] = useState({
    url: "",
    title: "",
    price: "",
    description: "",
    category: "",
    rating: "",
    votes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      id: id,
      url: formData.url,
      title: formData.title,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category,
      rating: Number(formData.rating),
      votes: Number(formData.votes),
    };

    dispatch(editApi({ id, formData: obj }));

    toast.info("Product is successfully updated...!");

    navigate("/");
  };

  return (
    <>
      <div className="py-10 flex flex-col gap-10 px-5">
        <h1 className="text-3xl text-center font-semibold">
          Edit Product Form
        </h1>
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
                onChange={handleChange}
                value={formData.url}
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
            </div>
            <div className="col-span-1 flex flex-col">
              <TextField
                id="outlined-number"
                label="Product Title *"
                type="text"
                name="title"
                onChange={handleChange}
                value={formData.title}
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
            </div>
            <div className="col-span-1 flex flex-col">
              <TextField
                id="outlined-number"
                label="Product Price *"
                type="text"
                name="price"
                onChange={handleChange}
                value={formData.price}
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
            </div>
            <div className="col-span-1 flex flex-col">
              <TextField
                id="outlined-number"
                label="Product Description *"
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
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
            </div>
            <div className="col-span-1 flex flex-col">
              <TextField
                id="outlined-number"
                label="Product Category *"
                type="text"
                name="category"
                onChange={handleChange}
                value={formData.category}
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
            </div>
            <div className="col-span-1 flex flex-col">
              <TextField
                id="outlined-number"
                label="Product Rating *"
                type="text"
                name="rating"
                onChange={handleChange}
                value={formData.rating}
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
            </div>
            <div className="col-span-1 flex flex-col">
              <TextField
                id="outlined-number"
                label="Product Votes *"
                type="text"
                name="votes"
                onChange={handleChange}
                value={formData.votes}
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
            </div>
            <button
              type="submit"
              className="md:col-span-2 text-white font-semibold text-lg py-3 cursor-pointer bg-yellow-700 hover:bg-yellow-800"
            >
              Edit Product
            </button>
          </Box>
        </div>
      </div>
    </>
  );
}

export default EditForm;
