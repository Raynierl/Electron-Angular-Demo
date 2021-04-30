const { app, BrowserWindow, desktopCapturer, ipcMain, webContents, ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs');



function createWindow () {
  // const win = new BrowserWindow({
  //   width: 1500,
  //   height: 900,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     contextIsolation: false,
  //     preload: path.join(__dirname, 'preload.js'),
      
  //   }
  // })
  
  // win.loadFile('./dist/electron-angular2-build/index.html')

   }

var  selectScreendialog;
var win;
app.whenReady().then(() => {
   win = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
      
    }
  })
  selectScreendialog = new BrowserWindow({
    parent: win,
    skipTaskbar: true,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    height: 700,
    width: 950
  })
  win.loadFile('./dist/electron-angular2-build/index.html')
  // selectScreendialog.loadURL('./dist/electron-angular2-build/index.html/selectScreen');
 
  // selectScreendialog = new BrowserWindow({
  //   parent: win,
  //   skipTaskbar: true,
  //   modal: true,
  //   show: false,
  //   height: 450,
  //   width: 750
  // })

  //createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
     
      createWindow()
      
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('show-selectScreen', (event, options) => {

  // Create a browser window
  // selectScreendialog = new BrowserWindow({
  //   parent: win,
  //   skipTaskbar: false,
  //   modal: true,
  //   show: false,
  //   height: 700,
  //   width: 950
  // })

console.log(options)
// Load the page + route
// selectScreendialog.loadURL('./dist/electron-angular2-build/index.html/#/selectScreen');
 
selectScreendialog.show()

// selectScreendialog.webContents.send('get-sources', options)
})
ipcMain.on('rendtomain', (event,args)=> {
  console.log(args)
  // console.log(sources)
  
  // if(sources != undefined){
  //   event.sender.send('maintorend', {sources})
  // }else{
  //   event.sender.send('maintorend', 'Sources Undefined')
  // }
  
})

