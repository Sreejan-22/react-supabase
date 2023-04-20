import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchSmoothie = () => {
      supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single()
        .then(({ data, error, status }) => {
          if (error) {
            navigate("/", { replace: true });
          }

          if (data && status == 200) {
            setInitialValues(data);
          }
        });
    };

    fetchSmoothie();
  }, [id, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    setIsLoading(true);
    supabase
      .from("smoothies")
      .update([values])
      .eq("id", id)
      .single()
      .then(({ status, error }) => {
        if (error) {
          console.log(error);
          setFormError("Something went wrong");
        } else if (status == 204) {
          e.target.reset();
          setFormError(null);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setFormError("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <h1>Update Page</h1>
      <form
        style={{ textAlign: "left", display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={initialValues?.title}
        />
        <label htmlFor="method">Method</label>
        {/* <input type="text" name="method" id="method" required /> */}
        <textarea
          name="method"
          id="method"
          required
          defaultValue={initialValues?.method}
        ></textarea>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          name="rating"
          id="rating"
          required
          min={1}
          max={10}
          defaultValue={initialValues?.rating}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#1a1a1a",
            color: "white",
            marginTop: "24px",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Smoothie"}
        </button>
      </form>
      {formError ? (
        <p style={{ color: "red", fontSize: "20px", marginTop: "32px" }}>
          {formError}
        </p>
      ) : null}
    </div>
  );
}
