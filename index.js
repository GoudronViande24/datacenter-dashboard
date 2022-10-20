// "Server-side" stuff

const { app, BrowserWindow, ipcMain } = require('electron');
const ping = require("ping");
const path = require("path");

app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	});
	ipcMain.handle("ping", latencyCheck);
	win.loadFile('index.html');

	win.setMenuBarVisibility(false);
});

function latencyCheck(event, target) {
	return new Promise(resolve => {
		ping.promise.probe(target, { timeout: 5 }).then(response => {
			if (response.time === "unknown") {
				console.log(response);
				throw new Error();
			}
			resolve(response.time);
		}).catch((error) => {
			console.log(error);
			resolve("error");
		});
	})
}