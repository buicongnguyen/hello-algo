import path from "node:path";

export function resolveSiteRequest(outputRoot, requestUrl) {
  let requestPath;
  try {
    requestPath = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  } catch {
    return { error: 400, message: "Bad request" };
  }

  const filePath = requestPath.endsWith("/") ? `${requestPath}index.html` : requestPath;
  const candidate = path.resolve(outputRoot, `.${filePath}`);
  const relative = path.relative(outputRoot, candidate);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    return { error: 403, message: "Forbidden" };
  }
  return { candidate };
}
