export async function GET (request:Request, { params }: { params: { platform: string } }) {

    switch (params.platform.toLowerCase()) {
        case 'tiktok' :
            return new Response("TikTok")
        case 'dev' || 'developer':
            return new Response("Developer")
        default :
            return new Response("unknown platform")
    }
}