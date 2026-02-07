// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Routes
// const User = require("./models/User");

// // Register API
// app.post("/register", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.json({ message: "User already exists" });
//         }

//         const newUser = new User({ email, password });
//         await newUser.save();

//         res.json({ message: "Registration successful" });
//     } catch (error) {
//         res.status(500).json({ message: "Error registering user" });
//     }
// });

// // Login API
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email, password });

//         if (!user) {
//             return res.json({ message: "Invalid credentials" });
//         }

//         res.json({ message: "Login successful", user });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in" });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// /* =====================
//    Middleware
// ===================== */
// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

// app.use(express.json());
// app.use(express.static("public"));

// /* =====================
//    MongoDB Connection
//    (Serverless Safe)
// ===================== */
// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) return;

//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     isConnected = true;
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     throw error;
//   }
// };

// // Connect before handling any request
// app.use(async (req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (err) {
//     res.status(500).json({ message: "Database connection error" });
//   }
// });

// /* =====================
//    Routes
// ===================== */
// const User = require("./models/User");



// // Register
// app.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }

//     const newUser = new User({ email, password });
//     await newUser.save();

//     res.json({ message: "Registration successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user" });
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.json({ message: "Invalid credentials" });
//     }

//     res.json({ message: "Login successful", user });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in" });
//   }
// });

// if (process.env.NODE_ENV !== "production") {
//   const PORT = 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }


// /* =====================
//    IMPORTANT
// ===================== */
// module.exports = app;

const express = require("express");
const path = require("path");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

/* =======================
   ROUTES
======================= */

// Home route → index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// REGISTER route
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Email and password are required" });
    }

    // 🔹 For now: simple success response
    // (Later you can connect MongoDB here)
    return res.json({ message: "Registered successfully" });
});

// LOGIN route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: "Email and password are required" });
    }

    // 🔹 For now: always allow login
    return res.json({ message: "Login successful" });
});

// Portfolio page (extra safety)
app.get("/portfolio.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "portfolio.html"));
});

/* =======================
   EXPORT FOR VERCEL
======================= */

// ❌ DO NOT use app.listen()
// ✅ Vercel will handle the server
module.exports = app;
