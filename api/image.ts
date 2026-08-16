import type { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage & { query?: Record<string, string> }, res: ServerResponse & { status: (code: number) => any; json: (data: any) => any; send: (data: any) => any }) {
    const url = new URL(req.url || '', 'http://localhost');
    const id = url.searchParams.get('id') || (req.query && req.query.id);

    if (!id || typeof id !== 'string') {
        if (typeof res.status === 'function') {
            return res.status(400).json({ error: 'Missing or invalid image id' });
        }
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Missing or invalid image id' }));
        return;
    }

    const imageUrl = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;

    try {
        const response = await fetch(imageUrl, {
            headers: {
                'Referer': 'https://www.artic.edu/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            if (typeof res.status === 'function') {
                return res.status(response.status).json({ error: `Failed to fetch image: ${response.statusText}` });
            }
            res.statusCode = response.status;
            res.end(JSON.stringify({ error: `Failed to fetch image: ${response.statusText}` }));
            return;
        }

        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        res.end(Buffer.from(buffer));
    } catch (err: any) {
        if (typeof res.status === 'function') {
            return res.status(500).json({ error: err.message || 'Internal error' });
        }
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message || 'Internal error' }));
    }
}
