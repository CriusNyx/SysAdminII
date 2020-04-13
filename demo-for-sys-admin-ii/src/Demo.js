import React from 'react';
import ReactPlayer from 'react-player';

function Demo(){
    return (
        <div className="App">
        <header className="App-header">
            <h1>
                Demo Video
            </h1>
            <p>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=m73kpKEesEQ">

                    </ReactPlayer>
            </p>
        </header>
    </div>
    )
}

export default Demo;