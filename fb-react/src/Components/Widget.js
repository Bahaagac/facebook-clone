import React from 'react';

const Widget = () => {
    return (
        <div className='widget'>
            <iframe src="<Iframe Link>"
                width="340"
                height="1500"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameborder="0"
                allowTransparency="true"
                allow="encrypted-media"
            ></iframe>
        </div>
    )
}

export default Widget;