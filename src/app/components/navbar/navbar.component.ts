import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ConnectionService } from 'ngx-connection-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  networkStatus: any;
  internetStatus: any = true;
  connectionStatus : boolean;

  constructor(private e:ElectronService, private _ic: ConnectionService,) { }
  isElectron: boolean;
  ngOnInit(): void {
    this.isElectron = this.e.isElectronApp;
    if(!this.isElectron){
    this._ic.monitor().subscribe(isConnected => {
     
      this.networkStatus = isConnected.hasNetworkConnection;
      this.internetStatus = isConnected.hasInternetAccess;
      if (this.networkStatus && this.internetStatus) {
        console.warn('ONLINE')
        this.connectionStatus = true;
      } else {
        console.warn('OFFLINE')
      }
    });
  }
  else{
    this.connectionStatus= navigator.onLine ?  true : false;
    this.connectionStatus ? console.warn('ONLINE') : console.warn('OFFLINE');
  }
  }

}
