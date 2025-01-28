const isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res
      .status(403)
      .send({ success: false, message: "You are not authorized as an admin" });
  } else {
    next();
  }
};
export default isAdmin;
