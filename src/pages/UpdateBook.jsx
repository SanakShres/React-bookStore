import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      desc: "",
      price: null,
      cover: "",
    },
  });

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${id}`);
        const data = res.data[0];
        reset(data);
      } catch (err) {
        console.log("err",err);
      }
    };
    fetchBook();
  }, [id, reset]);

  const onSubmit = async (data) => {
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    try {
      await axios.put(`http://localhost:8800/books/${id}`, data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="books_container">
      <h1>Edit Book</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="book_form"
        method="post"
      >
        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Book Title"
            {...register("title")}
          />
        </div>
        <div className="form-group">
          <label>Book Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Book Description"
            {...register("desc")}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Book Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            {...register("price")}
          />
        </div>
        <div className="form-group">
          <label>Book Cover</label>
          <input
            type="text"
            className="form-control"
            placeholder="Cover"
            {...register("cover")}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
