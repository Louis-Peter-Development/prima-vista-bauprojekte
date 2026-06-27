const ONE_DAY_MS = 24 * 60 * 60 * 1000;

let cache = { data: null, timestamp: 0 };

async function getGoogleReviews(apiKey, placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&reviews_sort=newest&language=de&key=${apiKey}`;
  // Bound the upstream call so a stalled Google endpoint can't hang the function.
  const res = await fetch(url, { signal: AbortSignal.timeout(7000) });
  if (!res.ok) throw new Error(`Google API ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK') throw new Error(`Google status ${json.status}`);
  const r = json.result || {};
  return {
    name: r.name,
    rating: r.rating,
    userRatingsTotal: r.user_ratings_total,
    url: r.url,
    reviews: (r.reviews || []).map((rv) => ({
      author: rv.author_name,
      rating: rv.rating,
      text: rv.text,
      relativeTime: rv.relative_time_description,
      profilePhoto: rv.profile_photo_url,
    })),
  };
}

export default async (_req) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    return new Response(JSON.stringify({ error: 'Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const now = Date.now();
  const isStale = !cache.data || now - cache.timestamp > ONE_DAY_MS;
  let servedStale = false;

  if (isStale) {
    try {
      cache = { data: await getGoogleReviews(apiKey, placeId), timestamp: now };
    } catch (err) {
      // A transient Google failure must not take the widget down when we still
      // hold usable data — serve the stale cache and only hard-fail when empty.
      if (!cache.data) {
        return new Response(JSON.stringify({ error: err.message || 'Failed to fetch reviews' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      servedStale = true;
    }
  }

  const headers = { 'Content-Type': 'application/json' };
  if (process.env.NODE_ENV === 'production' || process.env.CONTEXT === 'production') {
    // Shorten the cache window after serving stale data so a recovered upstream
    // is picked up sooner than the usual 24h.
    headers['Cache-Control'] = servedStale ? 'public, max-age=300' : 'public, max-age=86400';
  }
  return new Response(JSON.stringify(cache.data), { status: 200, headers });
};
