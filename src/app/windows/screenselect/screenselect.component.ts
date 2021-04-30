import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-screenselect',
  templateUrl: './screenselect.component.html',
  styleUrls: ['./screenselect.component.css']
})
export class ScreenselectComponent implements OnInit {
  screens: any;
  screensArray: any[] = [];
  constructor(private e: ElectronService) { }

  async ngOnInit(): Promise<void> {
    this.screens = await this.e.desktopCapturer.getSources( {types: ['window','screen']});
    console.log(this.screens)
    this.screens.forEach(element => {
      element['parsedurl'] = element.thumbnail.toDataURL();
      console.log(element);
      this.screensArray.push(element)
    });
  }
}
