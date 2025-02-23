import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApi } from "../features/ApiSlice";
import { deleteApi } from "../features/ApiSlice";
import StarIcon from "@mui/icons-material/Star";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProductsCom() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getApi());
    }, 700);
  }, []);

  const record = useSelector((state) => {
    return state.apiReducer;
  });

  const handleDelete = (id) => {
    dispatch(deleteApi(id));
    toast.success("Product delete successfully...!");
  };

  return (
    <>
      <section className="mt-20">
        {record.loading ? (
          <p className="text-2xl text-center font-semibold">Loading...</p>
        ) : record?.data && record.data.length > 0 ? (
          <div className="p-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {record.data.map((e, i) => {
              return (
                <div
                  key={i}
                  className="border group overflow-hidden relative shadow-2xl rounded-sm border-gray-400 col-span-1 p-5 flex flex-col gap-3"
                >
                  <div className="absolute hidden group-hover:block z-10 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] h-full w-full top-0 start-0">
                    <div className="flex items-start gap-10 mt-[50%] justify-center h-full">
                      <Link
                        to={`/editForm/${e.id}`}
                        className="p-3 cursor-pointer border-2 border-white rounded-full"
                      >
                        <ModeEditIcon fontSize="large" className="text-white" />
                      </Link>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="p-3 cursor-pointer border-2 border-white rounded-full"
                      >
                        <DeleteForeverIcon
                          fontSize="large"
                          className="text-white"
                        />
                      </button>
                    </div>
                  </div>
                  <img src={e.url} className="w-full h-80" alt={e.title} />
                  <h1 className="font-semibold">
                    {e.title}. ({e.category})
                  </h1>
                  <h1 className="">{e.description.slice(0, 80)}...</h1>
                  <div className="flex justify-start items-center gap-3">
                    <p className="text-2xl text-green-600 font-semibold">
                      &#8377;{e.price}
                    </p>
                    <p className="flex items-center gap-1 font-semibold">
                      <StarIcon className="text-orange-500" /> {e.rating}
                    </p>
                    <p className="font-semibold">({e.votes})</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-2xl text-center font-semibold">
            No products available
          </p>
        )}
      </section>
    </>
  );
}

export default ProductsCom;
