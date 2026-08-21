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
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
                'Referer': 'https://www.artic.edu',
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
