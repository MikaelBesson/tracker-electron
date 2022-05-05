const {app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fetch = require('node-fetch');


//create the browser window and load the main html entry point
let mainWindow = null;
const makeWindow = () => {
    mainWindow = new BrowserWindow({
        width:1200,
        height:600,
        center:true,
        title: "Tracker",
        autoHideMenuBar: true,
        icon: path.resolve(__dirname + "/assets/images/icon.png"),
        webPreferences: {
            preload: path.resolve(__dirname + "/preload.js")
        }
    })

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('src/index.html')
};

//create app when electron is ready
app.whenReady().then(() => {
    makeWindow();
    // on macOs, if app window does not exists, then create on activate event
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().lenght === 0) {
            makeWindow()
        }
    })
});

ipcMain.on('log', (event, arg) => {
    if('type' in arg && 'message' in arg) {
        console.table(arg);
        console.log(`type: ${arg.type} => message: ${arg.message}`);
        event.sender.send('main-process-event', 'message logged');
    }
    else {
        console.error('Une erreur inconue a été reportée par un render process');
    }
});

ipcMain.handle('ajax-request', async (event, url) => {
    const response = await fetch(url);
    return response.json();
});

ipcMain.handle('showMessageBox', (event, arg) => dialog.showMessageBox(mainWindow, arg));



//closing app if all windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
});