export async function handler(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing Bandcamp URL" }),
    };
  }

  try {
    const response = await fetch(`https://bandcamp.com/oembed?url=${encodeURIComponent(url)}&format=json`);
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
