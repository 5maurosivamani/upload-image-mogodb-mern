const { log } = require("console");
const express = require("express");
const router = express();
const fs = require("fs");
const path = require("path");

const UploadModel = require("../model/uploadModel");

const getServerPath = () => {
  const pathArr = __dirname.split("\\");
  const serverPath = pathArr.splice(0, pathArr.length - 1).join("/");
  return serverPath;
};

router.get("/", (req, res) => {
  UploadModel.find((err, docs) => {
    res.send(docs);
  });
});

router.get("/:id", (req, res) => {
  UploadModel.findOne({ _id: req.params.id }, (err, doc) => {
    const serverPath = getServerPath();
    const imgFullUrl = path.join(serverPath, "uploads", doc.imgName);

    fs.writeFileSync(imgFullUrl, doc.image.data, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Successfully Writed!");
    });

    res.sendFile(imgFullUrl);
  });
});

router.post("/", (req, res) => {
  const targetFile = req.files.image;

  const serverPath = getServerPath();

  const ext = targetFile.name.split(".").pop();

  const imgName = "IMAGE__" + Date.now() + "." + ext;

  targetFile.mv(path.join(serverPath, "uploads", imgName), (err) => {
    if (err) return;

    const newUpload = new UploadModel({
      imgName: imgName,
      image: {
        data: fs.readFileSync(path.join(serverPath + "/uploads/" + imgName)),
        contentType: `image/${ext}`,
      },
    });

    newUpload.save((err, doc) => {
      if (err) {
        console.log(err);
      }
      res.send("Successfully Uploaded!");
    });
  });
});

module.exports = router;
