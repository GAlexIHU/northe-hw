import { Request } from "@backend/types";

function getRequestParams<T>(req: Request): T {
  return req.method === "GET" ? req.query : req.body;
}

export { getRequestParams };
