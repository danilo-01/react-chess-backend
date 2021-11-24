// Function to return a 404 not found or an error
const notFound = (err, req, res, next) => {
  if (err) {
    return res.status(err.status).send(
      JSON.stringify({
        message: err.message,
      })
    );
  }
  return res.status(404).send(
    JSON.stringify({
      message: "Endpoint not matched.",
    })
  );
};

module.exports = notFound;
