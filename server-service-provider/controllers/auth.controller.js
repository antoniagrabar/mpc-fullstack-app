import jwt from "jsonwebtoken";

export const authController = (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      res.json({
        auth: true,
        data: decode,
      });
    } catch (error) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No token found in request",
    });
  }
};
