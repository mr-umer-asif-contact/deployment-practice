import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

app.set("view engine", "hbs");

app.use("/static/images", express.static("uploads"));

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", upload.single("image"), function (req, res) {
  console.log(req.file);
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("App is listening");
});
