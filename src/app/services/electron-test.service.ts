import { Injectable } from '@angular/core';


import { ElectronService } from 'ngx-electron';
@Injectable({
  providedIn: 'root'
})

export class ElectronTestService {

  constructor(private e: ElectronService) {
  if(this.e.ipcRenderer)
    this.e.ipcRenderer.on('maintorend', (event,args)=> {
      console.log(args)
    })
  }

  
 getDesktopCaptuer(){
  if (this.e.isElectronApp){
    console.log('getDC');
    let screen;
    const electron = (window as any).require('electron');
    
  }

 }


  // ipctest(){
  //  this.e.ipcRenderer.send('rendtomain', 'YEETER')
  // }

}
