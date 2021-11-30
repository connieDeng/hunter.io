# hunter.io

Hunter.io is a revamp of the classic snake game introducing multiplayer, powerups, and changing terrain.

##### General Game Features
- Body collision killing
- Arrow keys movement control or wasd 
- Main Menu/Landing Page

##### Free for All
- Live leaderboard with who has the highest score
- Bots to maintain multiplayer
- Kill feed
- Resources scattered
- Random spawn

##### Game creation is still in progress:
###### The following is dev plan
- [x] Solo Snake Game
- [x] Adding mulitplayer functionality: Free For All
- [ ] Powerups
- [ ] CSS/styling

# How to run project on local environment

### Prerequisites
To install the necessary prerequisites, you must:
- cd into the client folder and run `yarn install`
- cd into the  backend folder and run `yarn install`

### Running the project
1. In the backend directory run `yarn start`
2. In a new terminal at the same time, in the client directory run `yarn start`. With bothing running at the same time, this command should run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    The page will reload if you make edits and you will also see any lint errors in the console.

### Build and Deployment

`yarn build` builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

For this project specifically, you will need to:
- in the backend, `yarn install` all dependencies
- in client, install all dependencies and run `yarn build`

In the outer directory containing both the backend and client directories, the package.json should contain the scripts as follows:

```
"scripts": {
    "build:client": "cd ./client; yarn install && yarn build",
    "build:server": "cd ./backend; yarn install",
    "start": "cd ./backend; yarn start",
    "build": "yarn run build:client && yarn run build:server",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
``` 
 
Following, in the backend directory, server.js should contain:
  
```
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res, next) => {
  // console.log(path.resolve(__dirname, "../client", "build/index.html"));
  res.sendFile(path.resolve(__dirname, "../client", "build/index.html"))
});

const socketServerOptions = { };
if (process.env.NODE_ENV !== "production"){
  socketServerOptions.cors = { origin: "http://localhost:3000" };
}

const io = new Server(server, socketServerOptions);
```



