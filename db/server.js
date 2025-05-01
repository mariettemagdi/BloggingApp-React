const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("data.json");

const middlewares = jsonServer.defaults();
server.db = router.db;
server.use(auth);
server.use(middlewares);

server.listen(3000, () => {
  console.log("JSON Server with Auth running on port 3000");
});
