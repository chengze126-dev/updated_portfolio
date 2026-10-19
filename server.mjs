import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

function resolveSafe(pathname) {
  const full = resolve(root, pathname.replace(/^[/\\]+/, ""));
  const base = root.endsWith(sep) ? root : root + sep;
  if (full !== root && !full.startsWith(base)) return null;
  return full;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    const candidates = [pathname, `/public${pathname}`];

    for (const candidate of candidates) {
      const file = resolveSafe(candidate);
      if (!file) continue;
      try {
        const body = await readFile(file);
        const type = types[extname(file).toLowerCase()] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
        res.end(body);
        return;
      } catch {
        // Try the next candidate.
      }
    }

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error");
  }
});

server.listen(5173, "127.0.0.1", () => {
  console.log("Portfolio running at http://127.0.0.1:5173");
});
