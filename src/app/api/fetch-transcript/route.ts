export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), { status: 400 });
  }

  try {
    const res = await fetch(`http://backend:8000/transcript?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    // console.log(data);
    if (data.error) {
      return new Response(JSON.stringify({ error: data.error }), { status: 500 });
    }
    return new Response(JSON.stringify(data.transcript), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
