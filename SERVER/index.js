const express = require("express");
const app = express();

const userRoutes = require("./route/User")
const paymentRoutes = require("./route/Payment")
const courseRoutes = require("./route/Course")
const profileRoutes = require("./route/Profile")

const database = require("./config/database");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const { updateDisplayPicture } = require("./controller/Profile");
const { auth } = require("./middleware/auth");

dotenv.config();
const PORT = process.env.PORT || 400;

//database connect
database.connect();
cloudinaryConnect();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(fileUpload({
    tempFileDir: "/temp",
    useTempFiles: true,
}))


// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);

app.post("/updateProfile", auth, updateDisplayPicture);

//default route
app.get("/", (req, res) => {
    return res.status(201).json({
        success: true,
        message: "Your server is up and running....."
    })
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));