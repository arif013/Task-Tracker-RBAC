import jwt from "jsonwebtoken";

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token not exist in cookie" });
    }

    const decode = jwt.verify(refreshToken, process.env.JWT_SECRETR);

    const accessToken = jwt.sign(
      {
        id: decode.id,
        email: decode.email,
        name: decode.name,
        role: decode.role,
      },
      process.env.JWT_SECRETA,
      {
        expiresIn: "30m",
      },
    );

    return res.status(201).json({
      accessToken,
    });
  } catch (err) {
    console.error("Error in fetching refresh token", err);
    return res.status(403).json({
      message: "Invalid refresh Token",
    });
  }
};

export default refreshAccessToken;
