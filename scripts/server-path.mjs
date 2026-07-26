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

export function resolveByteRange(value, size) {
  if (!value) return null;
  const match = value.match(/^bytes=(\d*)-(\d*)$/);
  if (!match || (!match[1] && !match[2]) || !Number.isSafeInteger(size) || size <= 0) {
    return { error: 416 };
  }

  let start;
  let end;
  if (!match[1]) {
    const suffixLength = Number(match[2]);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return { error: 416 };
    start = Math.max(0, size - suffixLength);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || end < start || start >= size) {
      return { error: 416 };
    }
    end = Math.min(end, size - 1);
  }

  return { start, end, length: end - start + 1 };
}
