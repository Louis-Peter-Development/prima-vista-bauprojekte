const ONE_DAY_MS = 24 * 60 * 60 * 1000;

let cache = { data: null, timestamp: 0 };

async function getGoogleReviews(apiKey, placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&reviews_sort=newest&language=de&key=${apiKey}`;
  const res = await fetch(url);
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

  try {
    const now = Date.now();
    if (!cache.data || now - cache.timestamp > ONE_DAY_MS) {
      cache = { data: await getGoogleReviews(apiKey, placeId), timestamp: now };
    }

    const headers = { 'Content-Type': 'application/json' };
    if (process.env.NODE_ENV === 'production' || process.env.CONTEXT === 'production') {
      headers['Cache-Control'] = 'public, max-age=86400';
    }
    return new Response(JSON.stringify(cache.data), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to fetch reviews' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
