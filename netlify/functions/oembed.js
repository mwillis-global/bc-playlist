export async function handler(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing Bandcamp URL" }),
    };
  }

  try {
    const response = await fetch(`https://bandcamp.com/oembed?url=${encodeURIComponent(url)}&format=json`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NetlifyFunctionBot/1.0)',
        'Accept': 'application/json'
      }
    });

    // Check if it's actually returning JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Invalid response from Bandcamp", preview: text.slice(0, 200) })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch Bandcamp oEmbed",
        details: error.message,
      }),
    };
  }
}
