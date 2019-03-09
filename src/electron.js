const url = require('url');
const path = require('path');
const { app, BrowserWindow } = require('electron');
const { DEFAULT_DEV_PORT } = require('./utils/index.js');

const { PORT, NODE_ENV } = process.env;
const port = PORT || DEFAULT_DEV_PORT;

const IS_PROD = NODE_ENV === 'production' || NODE_ENV === undefined;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow();

  const starturlProd = url.format({
    pathname: path.join(__dirname, '../docs/index.html'),
    protocol: 'file:',
    slashes: true
  });
  const starturlDev = `http://localhost:${port}`;

  // If in prod use build/docs folder, otherwise use localhost
  const starturl = IS_PROD ? starturlProd : starturlDev;

  // and load the index.html of the app.
  // win.loadFile('index.html');
  win.loadURL(starturl);

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.maximize(); // Maximize window upon creation
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
