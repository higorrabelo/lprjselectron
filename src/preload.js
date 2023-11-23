// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('actions',{
    exit:()=>ipcRenderer.invoke('exit'),
    minimize:()=>ipcRenderer.invoke('minimize'),
    maximize:()=>ipcRenderer.invoke('maximize'),
})