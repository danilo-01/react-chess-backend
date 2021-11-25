// Function to return a 404 not found or an error
const notFoundOrError = (err, req, res, next) => {
  if (err) {
    return res.status(err.status || 500).send({
      message: err.message || "Server Error",
    });
  }
  return res.status(404).send({
    message: "Endpoint not matched.",
  });
};

module.exports = notFoundOrError;
