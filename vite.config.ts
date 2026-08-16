import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

function imageProxyPlugin(): Plugin {
  return {
    name: 'image-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/image')) {
          const urlObj = new URL(req.url, 'http://localhost');
          const id = urlObj.searchParams.get('id');
          if (!id) {
            res.statusCode = 400;
            res.end('Missing image id');
            return;
          }
          const targetUrl = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
          try {
            const fetchRes = await fetch(targetUrl, {
              headers: {
                'Referer': 'https://www.artic.edu/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
              }
            });
            if (!fetchRes.ok) {
              res.statusCode = fetchRes.status;
              res.end('Failed to fetch image');
              return;
            }
            const contentType = fetchRes.headers.get('content-type') || 'image/jpeg';
            const arrayBuffer = await fetchRes.arrayBuffer();
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=604800');
            res.end(Buffer.from(arrayBuffer));
          } catch {
            res.statusCode = 500;
            res.end('Error fetching image');
          }
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), imageProxyPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})