// "Browser-extension" stuff

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ping", target => ipcRenderer.invoke("ping", target));