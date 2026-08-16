export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response(JSON.stringify({ error: 'Missing image id' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const imageUrl = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;

    try {
        const upstreamRes = await fetch(imageUrl, {
            headers: {
                'Referer': 'https://www.artic.edu/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        if (!upstreamRes.ok) {
            return new Response(
                JSON.stringify({ error: `Upstream failed: ${upstreamRes.status} ${upstreamRes.statusText}` }),
                {
                    status: upstreamRes.status,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const headers = new Headers();
        headers.set('Content-Type', upstreamRes.headers.get('content-type') || 'image/jpeg');
        headers.set('Cache-Control', 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400');
        headers.set('Access-Control-Allow-Origin', '*');

        return new Response(upstreamRes.body, {
            status: 200,
            headers,
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
