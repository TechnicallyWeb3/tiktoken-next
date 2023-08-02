import * as cheerio from 'cheerio';

function getDateFromTikTokId(id:string) : Date {
    // Convert the video ID to a BigInt to ensure it can handle large numbers
  const bigIntID = BigInt(id);

  // Convert the video ID to binary and take the first 32 bits
  const binaryString = bigIntID.toString(2);
  const first32Bits = '0' + binaryString.slice(0, 31);

  // Convert the first 32 bits back to decimal to get the Unix timestamp
  const unixTimestamp = parseInt(first32Bits, 2);

  return new Date (unixTimestamp * 1000);
}

export async function returnTikTokData (request:Request) {
    // console.log(request)
    // console.log(params)
    const searchParams = new URLSearchParams(request.url.split('?')[1])
    const hasHandle = searchParams.has('handle') || searchParams.has('h')
    const hasId = searchParams.has('id')

    if (hasHandle || hasId) {
        const user = hasHandle ? searchParams.has('h') ? searchParams.get('h'): searchParams.get('handle') : searchParams.get('id')

        console.log(user)

        const url = new URL(`https://tiktok.com/@${user}`)

        const response = await fetch(url)

        const html = await response.text()

        const $ = cheerio.load(html)
        // console.log(html)
        const appContext = $("#SIGI_STATE").text();
        const json = JSON.parse(appContext);
        // console.log(json)

        let userData = json.UserModule['users'];
        const handle = Object.keys(userData)[0];
        console.log(handle)
        userData = userData[handle]
        const id = userData.id
        const name = userData.nickname
        const date = getDateFromTikTokId(id)
        const lgImage = userData.avatarLarger
        const mdImage = userData.avatarMedium
        const smImage = userData.avatarThumb
        const bio = userData.signature
        const verified = userData.verified

        const statsData = json.UserModule['stats'][handle];
        const followers = statsData.followerCount
        const following = statsData.followingCount
        const likes = statsData.heartCount
        const posts = statsData.videoCount

        const data = {
            id:id,
            handle:handle,
            name:name,
            registerDate:date,
            smImage:smImage,
            mdImage:mdImage,
            lgImage:lgImage,
            bio:bio,
            verified:verified,
            followers:followers,
            following:following,
            likes:likes,
            posts:posts,
        }

        // console.log(data)

        return new Response (JSON.stringify(data))
    } else {
        return new Response ("handle or id required")
    }
}

export async function GET (request:Request, { params }: { params: { platform: string } }) {

    switch (params.platform.toLowerCase()) {
        case 'dev' :
        case 'developer':
            return new Response("Developer")
        case 'tiktok' :
            return returnTikTokData(request)
        default :
            return new Response("unknown platform")
    }
}
