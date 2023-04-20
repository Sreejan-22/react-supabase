import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const SmoothieCard = ({ smoothie }) => {
  const navigate = useNavigate();

  function handleDelete() {
    const id = smoothie?.id;
    if (window.confirm("Are you sure you want to delete this smoothie?")) {
      console.log("delete");
      supabase
        .from("smoothies")
        .delete()
        .eq("id", id)
        .then(({ status, error }) => {
          if (error) {
            console.log(error);
            window.alert("An error occurred");
          } else if (status == 204) {
            window.location.reload();
          }
        });
    }
  }

  return (
    <div
      className="basic"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "32px",
        width: "500px",
        padding: "16px",
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <h2>{smoothie?.title}</h2>
      <h4>{smoothie?.method}</h4>
      <p>Rating - {smoothie?.rating}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/update/${smoothie?.id}`)}
        >
          <svg
            enable-background="new 0 0 19 19"
            height="19px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 19 19"
            width="19px"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            color="white"
          >
            <g>
              <path
                d="M8.44,7.25C8.348,7.342,8.277,7.447,8.215,7.557L8.174,7.516L8.149,7.69   C8.049,7.925,8.014,8.183,8.042,8.442l-0.399,2.796l2.797-0.399c0.259,0.028,0.517-0.007,0.752-0.107l0.174-0.024l-0.041-0.041   c0.109-0.062,0.215-0.133,0.307-0.225l5.053-5.053l-3.191-3.191L8.44,7.25z"
                fill="#231F20"
              />
              <path
                d="M18.183,1.568l-0.87-0.87c-0.641-0.641-1.637-0.684-2.225-0.097l-0.797,0.797l3.191,3.191l0.797-0.798   C18.867,3.205,18.824,2.209,18.183,1.568z"
                fill="#231F20"
              />
              <path
                d="M15,9.696V17H2V2h8.953l1.523-1.42c0.162-0.161,0.353-0.221,0.555-0.293   c0.043-0.119,0.104-0.18,0.176-0.287H0v19h17V7.928L15,9.696z"
                fill="#231F20"
              />
            </g>
          </svg>
        </span>{" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={handleDelete}
          >
            {" "}
            <g>
              {" "}
              <path fill="none" d="M0 0h24v24H0z" />{" "}
              <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm3-3V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9zm0 8v6h2v-6H9zm4 0v6h2v-6h-2z" />{" "}
            </g>{" "}
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SmoothieCard;
