
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // if ((req.bod y).status === "done" && req.body?.result_url) {
    //   socket.Socket.sendLatestUpdate("message", req.body.user_data, { result_url: req.body.result_url });
    // }
    return;
  } catch (error) {
    console.error("Error in OpenAI API route:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process the request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}