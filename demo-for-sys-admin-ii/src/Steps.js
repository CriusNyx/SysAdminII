import React from 'react';
import {CopyBlock} from 'react-code-blocks';
//See https://github.com/rajinwonderland/react-code-blocks to see how to use code-blocks library

function Steps(){
    return (
        <div className="App">
        <header className="App-header">
            <h1>
                Steps to Reproduce This Project
            </h1>
            <p>
            Install Mongo.db on your computer
my-file-server
Install Node JS
Install Yarn package manager for node js globally
Install react-script and nodemon globally
"yarn global add react-scripts"
"yarn global add nodemon"
In frontend and backend directory run the command "yarn start"
Command to start backend "nodemon app.js"
Command to start front-end is "yarn start"

            </p>
        </header>
    </div>
    )
}

export default Steps;