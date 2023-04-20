import "./App.css";
import supabase from "./config/supabaseClient";
import { useState, useEffect, Fragment } from "react";
import SmoothieCard from "./components/SmoothieCard";

function App() {
  const [smoothies, setSmoothies] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchSmoothies() {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*")
        .order("rating", { ascending: false });
      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    }

    fetchSmoothies();
  }, []);

  return (
    <div className="App">
      <h1>Supabase + React</h1>
      <div className="links">
        <a href="/create" style={{ fontSize: "20px" }}>
          Create new smoothie
        </a>
      </div>
      {fetchError ? <p style={{ color: "red" }}>{fetchError}</p> : null}
      <div style={{ marginTop: "56px" }}>
        <p>List of smoothies (in descending order w.r.t rating)</p>
        {smoothies?.map((item) => (
          <Fragment key={item?.id}>
            <SmoothieCard smoothie={item} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
