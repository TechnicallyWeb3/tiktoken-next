export async function GET (request:Request, { params }: { params: { platform: string } }) {

    if (params.platform.toLowerCase() != 'tiktok') {
        console.log(params)
        return new Response("unknown platform")
    } else {
        return new Response("TikTok")
    }
}