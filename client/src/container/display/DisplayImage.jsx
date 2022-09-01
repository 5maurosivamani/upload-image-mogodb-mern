import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function DisplayImage() {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    await axios
      .get("http://localhost:5000")
      .then((response) => {
        setImages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="container">
      <h3 className="h3 text-primary">Display Image</h3>

      <div className="row">
        {images.map((item, index) => {
          const blob = new Blob([Int8Array.from(item.image.data.data)], {
            type: item.image.contentType,
          });

          const image = window.URL.createObjectURL(blob);
          return (
            <div className="col-lg-4 col-md-6" key={uuidv4()}>
              <img src={image} alt="" height="100%" width="100%" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayImage;
