# stencil v2.0.0
A web engine for visualizing and sharing life science datasets

## Documentation

Installation:

1. Start mongo db server.
   
2. Download source code: 

   ```
   git clone https://github.com/qisun2/stencil2.git
   ```

3. Install dependencies.

   ```
   cd stencil2/backend
   npm install
   
   cd ../frontend
   npm install
   
   cd ..
   ```

4. Configure the web site.

   a. stencil2/backend/.env
   ```
   DB_HOST="localhost"                   // Mongo db host
   DB_NAME="testDB"                      // Mongo db database name
   API_PORT="8081                        // API port name

   FRONT_API="https://localhost:3000"    //root URL of the frontend 

   HTTPS = true                          // using HTTPS
   HTTPSCERT = "/home/xxxxx/fullchain.pem" //path of https certificate   
   HTTPSKEY = "/home/xxxxx/privkey.pem"  //path of https key

   SESSION_ENCRYPTION = "xxxxxx"
   SESSION_NAME = "stencil"
   MASTER_PWD = "aaaaaa"

   PROXY_SETTING='{"/xxxxxx" : "http://xxx.xxxx.xxxx.xx:xxxx"}'   // proxy setting
   ```
   
   * If your frontend app needs to access api call from 3rd party, e.g. galaxy server, you need to use proxy  through backend server. In the frontend app, the URL "http://xxx.xxxx.xxxx.xx:xxxx/datasets/{options}" should be replaced with "http://backendserver:xxxx/datasets/{options}". Most browsers would prohibit cross-domain call for the front end, so that proxy is needed.
   
   
   
   b. stencil2/frontend/.env
   ```
   PORT="3000"             // frontend port number
   
   HTTPS=true
   SSL_CRT_FILE=/home/xxxxx/fullchain.pem //path of https certificate   
   SSL_KEY_FILE=/home/xxxxx/privkey.pem //path of https key
   BROWSER=none
   ```
   
   c. stencil2/frontend/src/Config.js
   ```
   apiURL: "http://stencil.biohpc.cornell.edu:8081",    // URL of the backend server
   SSOURL: "https://stencil.biohpc.cornell.edu",   // URL of login page 
   
   samplesEndpoint: "/samples",       // api endpoint for retrieve sample list (deprecated)
   librariesEndPoint: "/libraries",		// api endpoint for retrieve library list
   libraryPageEndPoint: "/libraries/dbid",   //api endpoint for retrieve a library based on db id
   trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl=" //genome growser URL prefix
   ```

3. Start the backend and front end server.

   ```
   screen
   
   cd stencil2/backend
   
   npm start
   
   #press ctrl-a c to switch screen
   
   cd stencil2/frontend
   npm start
   ```

4. Post example data.

   Modify the postData.py and postLibrary.py located in stencil2/backend/utils.

   Replace the URL from "http://localhost/samples" to appropriate backend URL.

   ```
   cd stencil2/backend/utils
   
   python postLibrary.py ../sampleData/example_lib.json
   ```
   
   

   

5. Open browser

   URL:  http://localhost:3000

   

6. To visualize image/data files stored on the local computer. 

   You need to have an instance of Stencil server running on your desktop or laptop computer, and  keep the datafiles under stencil2/backend/sampleData/localdata. They can be organized into sub-directories.

   The url of the local file is: http://localhost:8081/localdata/subDirectoryName/myImage.png



### Managing users

1. First time you start the web server, you need to set the root user. Click "REGISTER", enter "root" as Username and set the password. Once "root" user is set, you can add more users by login as "root" user.
2. Modify the file stencil2/backend/.env change the value for "MASTER_PWD". This password allows you to login as any users.

