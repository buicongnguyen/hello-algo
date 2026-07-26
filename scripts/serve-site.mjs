import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { resolveByteRange, resolveSiteRequest } from "./server-path.mjs";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(projectRoot, "dist");
const port = Number(process.env.PORT || 4173);
const host = process.env.HELLO_ALGO_HOST || "127.0.0.1";
const types = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".webp": "image/webp"
};

createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { "Allow": "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" }).end("Method not allowed");
    return;
  }
  const resolved = resolveSiteRequest(outputRoot, request.url || "/");
  if (resolved.error) {
    response.writeHead(resolved.error, { "Content-Type": "text/plain; charset=utf-8" }).end(resolved.message);
    return;
  }
  const { candidate } = resolved;

  try {
    const file = await stat(candidate);
    if (!file.isFile()) throw new Error("Not a file");
    const headers = {
      "Accept-Ranges": "bytes",
      "Content-Length": file.size,
      "Content-Type": types[path.extname(candidate)] || "application/octet-stream"
    };
    const range = resolveByteRange(request.headers.range, file.size);
    if (range?.error) {
      response.writeHead(range.error, { ...headers, "Content-Length": 0, "Content-Range": `bytes */${file.size}` }).end();
      return;
    }
    if (range) {
      headers["Content-Length"] = range.length;
      headers["Content-Range"] = `bytes ${range.start}-${range.end}/${file.size}`;
      response.writeHead(206, headers);
      if (request.method === "HEAD") response.end();
      else createReadStream(candidate, { start: range.start, end: range.end }).pipe(response);
      return;
    }
    response.writeHead(200, headers);
    if (request.method === "HEAD") response.end();
    else createReadStream(candidate).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
  }
}).listen(port, host, () => {
  console.log(`Hello Algo trilingual site running at http://${host}:${port}`);
});
