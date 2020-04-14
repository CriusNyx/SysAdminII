import React from 'react';
import { CodeBlock } from 'react-code-blocks';
//See https://github.com/rajinwonderland/react-code-blocks to see how to use code-blocks library

function Steps(){
    return (
        <div className="App">
        <header className="App-header">
            <h1>
                Steps to Reproduce This Project
            </h1>
            <table>
                <tbody>
                    <tr>
                        Use git to clone the project on the frontend and backend server 
                    </tr>
                    <br/>
                    <tr>
                        <CodeBlock
                            text={"git clone https://github.com/CriusNyx/SysAdminII"}
                            language={"bash"}
                            />
                    </tr>
                    <br/>
                    <tr>
                        <h2>
                            Installation:
                        </h2>
                    </tr>
                    <tr>
                        <h3>
                            Frontend:
                        </h3>
                    </tr>
                    <tr>
                        <p>
                            Install the following dependancies using your systems package manager: 
                        </p>
                    </tr>
                    <tr>
                        docker
                    </tr>
                    <tr>
                        node.js
                    </tr>
                    <tr>
                        yarn (look at instructions on yarn package managers website)
                    </tr>
                    <tr>
                        <h3>Backend:</h3>
                    </tr>
                    <tr>
                        Install the following dependencies using your systems package manager:
                    </tr>
                    <tr>
                        node.js
                    </tr>
                    <tr>
                        yarn (look at instructions on yarn package managers website)
                    </tr>
                    <tr>
                        <h2>Configuration:</h2>
                    </tr>
                    <tr>
                        <h3>Frontend:</h3>
                    </tr>
                    <tr>
                        <p>
                            Open port 80 and change the serverurl variable in the FileManager.js and SignIn.js files to match the url for your backend server.
                        </p>
                    </tr>
                    <tr>
                        <h3>Backend:</h3>
                    </tr>
                    <tr>
                        <p>
                            Open port 80.
                        </p>
                    </tr>
                    <tr>
                        <h2>Deployment:</h2>
                    </tr>
                    <tr>
                        <h3>Frontend:</h3>
                    </tr>
                    <tr>
                        Run the following command in the SysAdminII directory:
                    </tr>
                    <br/>
                    <tr>
                        <CodeBlock
                            text={"sudo bash build-and-run.sh"}
                            language={"bash"}
                            />
                    </tr>
                    <br/>
                    <tr>
                        The scrupt will build and deploy the server.
                    </tr>
                    <tr>
                        <h3>Backend:</h3>
                    </tr>
                    <tr>
                        Run the following command in the SysAdminII/backend directory:
                    </tr>
                    <br/>
                    <tr>
                        <CodeBlock
                            text={"sudo back start-server.sh"}
                            language={"bash"}
                            />
                        
                    </tr>
                    <br/>
                    <tr>
                        The script will build and deploy the backend server.
                    </tr>
                    <tr>
                        <h2>Updating:</h2>
                    </tr>
                    <tr>
                        <h3>Frontend:</h3>
                    </tr>
                    <tr>
                        Followthe deployment instructions. The build-and-run.sh script will update the server automatically.
                    </tr>
                    <tr>
                        <h3>Backend:</h3>
                    </tr>
                    <tr>
                        Run the following command in the SysAdminII directory:
                    </tr>
                    <br/>
                    <tr>
                        <CodeBlock 
                            text={"git pull https://github.com/CriusNyx/SysAdminII"}
                            language={'bash'}
                            />
                    </tr>
                </tbody>
            </table>
        </header>
    </div>
    )
}

export default Steps;