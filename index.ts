import serverInit from "./backend/src/server";

serverInit().then(() => {
    console.log("Server started");
}).catch((err) => {
    console.error(err);
});
