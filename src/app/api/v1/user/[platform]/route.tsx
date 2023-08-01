export async function GET (request:Request, { params }: { params: { platform: string } }) {

    switch (params.platform.toLowerCase()) {
        case 'dev' :
        case 'developer':
            return new Response("Developer")
        case 'tiktok' :
            return new Response("TikTok")
        default :
            return new Response("unknown platform")
    }
}