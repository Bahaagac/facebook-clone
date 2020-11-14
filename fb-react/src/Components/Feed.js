import React from 'react'
import StoryReel from './StoryReel';
import MessageSender from './MessageSender';
import Post from './Post'



const Feed = () => {
    return (
        <div className ='feed'>
        <StoryReel/>
        <MessageSender/>
        <Post
            profilePic= 'https://picsum.photos/200'
            message= 'This is a message'
            timestamp = '1601493943737'
            imgName = 'imageName'
            username= 'Baha'
        />
            
         
        </div>
    )
}

export default Feed
