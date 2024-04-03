import "module-alias/register";
import { createApp } from "./server";

const app = createApp();

if (require.main === module) {
  (async () => {
    const server = await app.serve(3000);
    process.on("SIGINT", async () => {
      server.close((err) => console.log("Server closed: ", err));
      process.exit(0);
    });
  })();
}
