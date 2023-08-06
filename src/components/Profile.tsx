'use client'
import { UserData } from "@providers/web2"
import { LinkedIDs } from "@providers/web3"
import styled from 'styled-components';

const defaultImage = "https://avatars.githubusercontent.com/u/129417982?v=4"


const ProfileContainer = styled.div`
  /* Add your common profile container styles here */
  margin-bottom: 20px;
`;

const TagProfileContainer = styled(ProfileContainer)`
  /* Add your Tag profile styles here */
  color: white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(62, 62, 68, 1) 42%);
  border-radius: 8px;
/* Increased the shadow and made it darker */
  box-shadow: 
    0px 6px 12px rgba(0, 0, 0, 1.4),
    0px 0px 20px 10px rgba(173, 216, 230, 0.8),
    0px 0px 80px 40px rgba(173, 216, 230, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FlagProfileContainer = styled(ProfileContainer)`
  /* Add your Flag profile styles here */
  color: white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(62, 62, 68, 1) 42%);
  border-radius: 8px;
/* Increased the shadow and made it darker */
  box-shadow: 
    0px 6px 12px rgba(0, 0, 0, 1.4),
    0px 0px 20px 10px rgba(173, 216, 230, 0.8),
    0px 0px 80px 40px rgba(173, 216, 230, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: row; /* Set flex direction to row */
  align-items: flex-start; /* Align items to the top (image on top left) */
`;

const FlagImageContainer = styled.div`
  margin-right: 20px; /* Add spacing between image and text */
`;

const FlagTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardProfileContainer = styled(ProfileContainer)`
  /* Add your Card profile styles here */
  color: white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(62, 62, 68, 1) 42%);
  border-radius: 8px;
/* Increased the shadow and made it darker */
  box-shadow: 
    0px 6px 12px rgba(0, 0, 0, 1.4),
    0px 0px 20px 10px rgba(173, 216, 230, 0.8),
    0px 0px 80px 40px rgba(173, 216, 230, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FullProfileContainer = styled(ProfileContainer)`
  /* Add your Full profile styles here */
  color: white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(62, 62, 68, 1) 42%);
  border-radius: 8px;
/* Increased the shadow and made it darker */
  box-shadow: 
    0px 6px 12px rgba(0, 0, 0, 1.4),
    0px 0px 20px 10px rgba(173, 216, 230, 0.8),
    0px 0px 80px 40px rgba(173, 216, 230, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const DevProfileContainer = styled(ProfileContainer)`
  /* Add your Dev profile styles here */
  color: white;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(62, 62, 68, 1) 42%);
  border-radius: 8px;
/* Increased the shadow and made it darker */
  box-shadow: 
    0px 6px 12px rgba(0, 0, 0, 1.4),
    0px 0px 20px 10px rgba(173, 216, 230, 0.8),
    0px 0px 80px 40px rgba(173, 216, 230, 0.2);
  padding: 20px;
`;


export interface ProfileProps {
    size: 'tag' | 'flag' | 'card' | 'full' | 'dev'
    profile:UserData
}

export interface UserProps {
    platform: string
    id?:string // should be either ID or handle
    handle?: string // should be either or
    smImage?: URL
    mdImage?: URL
    lgImage?: URL
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

const ProfileTag: React.FC<UserProps> = ({ id, handle, platform }) => {
    // getuserData...
    
    return (
        <div>
            {/* <img src={smImage ? smImage.toString():defaultImage} />@{handle}({platform}) */}
        </div>
    )
}

const ProfileFlag: React.FC<UserProps> = ({ smImage, name, handle, verified, platform }) => {
    return (
        <div className="pic" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img src={smImage?.toString()} alt={`@${handle} (${platform}${verified ? ':verified':''})`} />
            <div>
                <p>{name}</p>
                <p>@{handle} ({platform}{verified ? ':verified':''})</p>
            </div>
        </div>
    );
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
    switch(size) {
        case "tag":
            return (
                <TagProfileContainer>
                    <ProfileTag id={profile.id} platform={profile.platform} />
                </TagProfileContainer>
            );
        case "flag":
            return (
                <FlagProfileContainer>
                    <ProfileFlag smImage={profile.smImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} verified={profile.verified} platform={profile.platform} />
                </FlagProfileContainer>
            );
        case "card":
            return (
                <CardProfileContainer>
                    <ProfileCard mdImage={profile.mdImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} posts={profile.posts} verified={profile.verified} platform={profile.platform} />
                </CardProfileContainer>
            );
        case "full":
            return (
                <FullProfileContainer>
                    <ProfileFull lgImage={profile.lgImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} followers={profile.followers} following={profile.following} likes={profile.likes} posts={profile.posts} verified={profile.verified} platform={profile.platform} />
                </FullProfileContainer>
            );
                case "dev":
            return (
                <div>
                    <h1>Profile Components</h1>
                    <h2>Tag</h2>
                    <TagProfileContainer>
                        <ProfileTag smImage={profile.smImage} handle={profile.handle} platform={profile.platform} />
                    </TagProfileContainer>
                    <h2>Flag</h2>
                    <FlagProfileContainer>
                {profile.smImage && (
                    <FlagImageContainer>
                        <img src={profile.smImage.toString()} alt={`@${profile.handle} (${profile.platform}${profile.verified ? ':verified':''})`} />
                    </FlagImageContainer>
                )}
                <FlagTextContainer>
                    <p>{profile.name}</p>
                    <p>@{profile.handle} ({profile.platform}{profile.verified ? ':verified':''})</p>
                </FlagTextContainer>
            </FlagProfileContainer>
                    <h2>Card</h2>
                    <CardProfileContainer>
                        <ProfileCard mdImage={profile.mdImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} posts={profile.posts} verified={profile.verified} platform={profile.platform} />
                    </CardProfileContainer>
                    <h2>Full</h2>
                    <FullProfileContainer>
                        <ProfileFull lgImage={profile.lgImage} name={profile.name} handle={profile.handle} registerDate={profile.registerDate} followers={profile.followers} following={profile.following} likes={profile.likes} posts={profile.posts} verified={profile.verified} platform={profile.platform} />
                    </FullProfileContainer>
                </div>
            );
        default:
            return "Profile component requires size"
    }
}

export default Profile