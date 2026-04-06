export async function POST(request) {
  // For now, just return a dummy message
  return new Response(
    JSON.stringify({ message: "File received successfully!" }),
    { status: 200 }
  );
}