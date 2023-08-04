'use client'
import { UserData } from "@providers/web2"
import { LinkedIDs } from "@providers/web3"
const defaultImage = "https://avatars.githubusercontent.com/u/129417982?v=4"
export interface ProfileProps {
    size: 'tag' | 'flag' | 'card' | 'full' | 'dev'
    profile:UserData
}

export interface UserProps {
    smImage?: URL
    mdImage?: URL
    lgImage?: URL
    handle: string
    platform: string
    name?: string
    verified?: boolean | string
    registerDate?: Date
    bio?:string
    followers?:number
    following?:number
    likes?:number
    posts?:number
    linkedIds?:LinkedIDs
}

const ProfileTag: React.FC<UserProps> = ({ smImage, handle, platform }) => {
    return (
        <div>
            <img src={smImage ? smImage.toString():defaultImage} />@{handle}({platform})
        </div>
    )
}

const ProfileFlag: React.FC<UserProps> = ({ smImage, name, handle, verified, platform }) => {
    return (
        <div>
            <img src={smImage?.toString()} />{name} - @{handle}({platform}{verified ? ':verified':''})<br />
        </div>
    )
}

const ProfileCard: React.FC<UserProps> = ({ mdImage, name, handle, registerDate, posts, verified, platform }) => {
    return (
        <div>
            <img src={mdImage?.toString()} />{name} - @{handle}({platform}{verified ? ':verified':''})<br />
            <p>Registered: {registerDate?.toLocaleDateString()} | Posts: {posts}</p>
        </div>
    )
}

const ProfileFull: React.FC<UserProps> = ({ mdImage, lgImage, name, handle, registerDate, followers, following, likes, posts, verified, platform }) => {
    return (
        <div>
            <img src={lgImage?.toString()} />
            <img src={mdImage?.toString()} />
            {name} - @{handle}({platform}{verified ? ':verified':''})<br />
            <p>Registered: {registerDate?.toLocaleDateString()}<br />
            Following: {following} | Followers: {followers} | Likes: {likes} | Posts: {posts}</p>
        </div>
    )
}

{/* <p> <img src={profile.smImage.toString()} />
User Name: {profile.name}<br />
Handle: {profile.handle}<br />
Register Date: {profile.registerDate?.toLocaleDateString()}<br />
Verified: {profile.verified.toString()}<br />
Bio: {profile.bio}<br />
Following: {profile.following}<br />
Followers: {profile.followers}<br />
Likes: {profile.likes}<br />
Posts: {profile.posts}<br />
</p> */}

const Profile: React.FC<ProfileProps> = ({ size, profile }) => {
    let html = "<div>loading<div>"
    switch(size) {
        case "tag":
            return ( <ProfileTag smImage={profile.smImage} handle={profile.handle} platform={profile.platform} /> )
        case "flag":
            return ( <ProfileFlag smImage={profile.smImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} verified={profile.verified} platform={profile.platform} /> )
        case "card":
            return ( <ProfileCard mdImage={profile.mdImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} posts={profile.posts} verified={profile.verified} platform={profile.platform} /> )
        case "full":
            return ( <ProfileFull mdImage={profile.mdImage} lgImage={profile.lgImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} followers={profile.followers} following={profile.following} likes={profile.likes} posts={profile.posts} verified={profile.verified} platform={profile.platform} /> )
        case "dev":
            return (
                <div>
                    <h1>Profile Components</h1>
                    <h2>Tag</h2>
                    <ProfileTag smImage={profile.smImage} handle={profile.handle} platform={profile.platform} />
                    <h2>Flag</h2>
                    <ProfileFlag smImage={profile.smImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} verified={profile.verified} platform={profile.platform} />
                    <h2>Card</h2>
                    <ProfileCard mdImage={profile.mdImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} posts={profile.posts} verified={profile.verified} platform={profile.platform} />
                    <h2>Full</h2>
                    <ProfileFull mdImage={profile.mdImage} lgImage={profile.lgImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} followers={profile.followers} following={profile.following} likes={profile.likes} posts={profile.posts} verified={profile.verified} platform={profile.platform} />
                </div>
            )
        default:
            return "Profile component requires size"
    }
}

export default Profile