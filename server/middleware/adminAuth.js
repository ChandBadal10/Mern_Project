import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { adminToken } = req.cookies;

    if (!adminToken) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default adminAuth;