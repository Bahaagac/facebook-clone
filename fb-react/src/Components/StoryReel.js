import React from 'react';
import Story from './Story';
import './StoryReel.css';

function StoryReel() {
    return (
        <div className="storyReel">
            <Story
            image="https://picsum.photos/200"
            profileSrc="https://picsum.photos/201"
            title="Baha Agac"
            />
            <Story
            image="https://picsum.photos/202"
            profileSrc="https://picsum.photos/203"
            title="Baha Agac1"
            />
            <Story
            image="https://picsum.photos/204"
            profileSrc="https://picsum.photos/205"
            title="Baha Agac2"
            />
        </div>
    )
}

export default StoryReel;
