const { app, BrowserWindow } = require("electron");
const path = require("path");

let isAppQuitting = false;
let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadURL("https://messages.google.com/web");
  win.on("close", (e) => {
    if (!isAppQuitting) {
      e.preventDefault();
      win.hide();
      console.log("app hide");
    } else {
      win = null;
      console.log("app quit");
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    win.show();
  });
});

app.on("before-quit", (evt) => (isAppQuitting = true));
app.on("window-all-closed", () => {
  process.platform !== "darwin" ? app.quit() : null;
});
