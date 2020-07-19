const { app, BrowserWindow } = require("electron");

function createWindow() {
	const win = new BrowserWindow({
		width: 1350,
		height: 790,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadURL("http://localhost:3000");
	win.webContents.openDevTools();
// 	win.webContents.enableDeviceEmulation({
// 		screenPosition: "mobile",
// 		screenSize: { width: 375, height: 667 },
//   });
  console.log("ID ", win.id);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		process.exit(0);
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
