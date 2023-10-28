const cors_proxy = require("cors-anywhere");

const corsOptions = {
  originWhitelist: [],
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
};

cors_proxy.createServer(corsOptions).listen(8080, "localhost", () => {
  console.log("CORS Anywhere proxy server is running on http://localhost:8080");
});
