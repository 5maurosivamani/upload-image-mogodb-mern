import { useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function Form() {
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file === "") {
      confirmAlert({
        title: "Warning!",
        message: "Please choose the file.",
        buttons: [
          {
            label: "Ok",
            onClick: () => true,
          },
        ],
      });
    } else {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("http://localhost:5000", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          confirmAlert({
            title: "Success!",
            message: "Image uploaded!",
            buttons: [
              {
                label: "Ok",
                onClick: () => true,
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container p-5 mt-lg-5 ">
      <form className="row g-3 col-lg-6 col-xs-12 mx-auto">
        <h1 className="h1 text-left text-primary text-start">Upload Image</h1>
        <div className="mb-3">
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={handleUpload}
          >
            Upload <i className="bi bi-cloud-arrow-up-fill"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
