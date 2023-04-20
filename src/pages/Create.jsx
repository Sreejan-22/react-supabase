import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function Create() {
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    setIsLoading(true);
    supabase
      .from("smoothies")
      .insert([values])
      .then(({ status, error }) => {
        if (error) {
          console.log(error);
          setFormError("Something went wrong");
        } else if (status == 201) {
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
      <h1>Create Page</h1>
      <form
        style={{ textAlign: "left", display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required />
        <label htmlFor="method">Method</label>
        {/* <input type="text" name="method" id="method" required /> */}
        <textarea name="method" id="method" required></textarea>
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          name="rating"
          id="rating"
          required
          min={1}
          max={10}
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
          {isLoading ? "Creating..." : "Create New Smoothie"}
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
