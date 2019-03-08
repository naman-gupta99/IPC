# IPC (Inter Platform Chat)

## Steps to setup the API:
* Install nodejs for your os, to run the server, from
[download node.js](https://nodejs.org/en/download/)

Note: You will need to make a config.js file in the project directory.
It's structure is similar to [config.js gist url](https://gist.github.com/naman-gupta99/14bb8b2802fa28ebb48686160c3c564c).
just add your mongodb url in the config.js file.

* Run the following command in the project directory to install all the required packages
```bash
npm install
```

* Run the following command in the project directory to run the server in development mode in windows
```bash
npm run server
```

* To generate the Swagger API Docs in windows , run
```bash
npm run server_gen
```

## API Documentation
* Run the project in Swagger API Docs Generation Mode
* Navigate to <YOUR_PROJECT_DIRECTORY>/public/api-docs
* Open index.html
