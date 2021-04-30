import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElectronTestService } from 'src/app/services/electron-test.service';
import { ElectronService } from 'ngx-electron';
import MediaDevices from 'media-devices';
import { BrowserWindow } from 'electron';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';


declare const x: any;
declare const gettingAll: any;
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  isElectron: boolean;
  videodevices: any;
  audioinput: any;
  audioOutput: any[];
  stream: any = null;
  facecam: MediaStream = null;
  @ViewChild('camera')
  camera: ElementRef<HTMLVideoElement>;
  @ViewChild('webcamera')
  webcamera: ElementRef<HTMLVideoElement>;
  @ViewChild('cameraReplay')
  cameraReplay: ElementRef<HTMLVideoElement>;
  videoRecorder_screen: any;
  audioRecorder_screen: any;
  @ViewChild('webcameraReplay')
  webcameraReplay: ElementRef<HTMLVideoElement>;
  videoRecorder_webcam: any;
  audioRecorder_webcam: any;
  @ViewChild('selectedScreenElectron')
  selectedScreenElectron: ElementRef<any>;
  networkStatus: any;
  internetStatus = true;
  screenReplay: any;
  webcamReplay: any;
  sources: any;
  screenSelectPopUp: BrowserWindow;
  constructor( private e: ElectronService, private sanitizer: DomSanitizer) {

 

  }

  ngOnInit(): void {


    this.isElectron = this.e.isElectronApp;
    this.getWebCamSources();
    this.getScreenSources();
    console.log(this.videodevices);
  }
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.


  }

  async getMedia(): Promise<void> {
    if (this.e.isElectronApp) {
      this.facecam = await MediaDevices.getUserMedia({ video: true, audio: false });
      console.log('Running in Electron');

      // console.log(this.selectedScreenElectron.nativeElement.value);
      console.log(this.sources[1]);
      const constraints = {
        audio: false,
        video: {
          mandatory:
          {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: this.sources[1].id,
          }
        }
      };

      this.stream = await navigator.mediaDevices.getUserMedia((constraints as MediaStreamConstraints));
      console.log(this.sources);

      try {
        console.log('check');
        // this.facecam = await MediaDevices.getUserMedia({video: true, audio: false})
        this.facecam = await MediaDevices.getUserMedia({ video: true, audio: false });
        // this.facecam = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        console.log('check2');
      }
      catch (e) {

        console.log(e);
        throw e;
      }
      console.log(this.facecam);

    }
    else {
      console.log('Running in Browser');
      this.stream = await MediaDevices.getDisplayMedia({ audio: false, video: true });
      try {
        this.facecam = await MediaDevices.getUserMedia({ audio: true, video: true });
      } catch (e) { throw e; }
    }
    this.webcamera.nativeElement.srcObject = this.facecam;
    this.camera.nativeElement.srcObject = this.stream;

  }

  play(): void {
    this.camera.nativeElement.play();
    this.webcamera.nativeElement.play();
  }
  pause(): void {
    this.camera.nativeElement.pause();
    this.webcamera.nativeElement.pause();
  }

  playcameraReplay(): void {
    this.cameraReplay.nativeElement.play();
  }
  pausecameraReplay(): void {
    this.cameraReplay.nativeElement.pause();

  }
  playwebcameraReplay(): void {
    this.webcameraReplay.nativeElement.play();
  }
  pausewebcameraReplay(): void {

    this.webcameraReplay.nativeElement.pause();
  }
  startRecording(): void {
    this.videoRecorder_screen = new RecordRTC(this.stream, {
      type: 'video',
      mimeType: 'video/mp4'
    });
    //   this.audioRecorder_screen = new RecordRTC(this.stream, {
    //   type: 'audio',
    //   mimeType: 'audio/webm'
    // });

    this.videoRecorder_webcam = new RecordRTC(this.facecam, {
      type: 'video',
      mimeType: 'video/mp4'
    });
    //   this.audioRecorder_webcam = new RecordRTC(this.facecam, {
    // type: 'audio',
    // mimeType: 'audio/webm'
    // });

    this.videoRecorder_screen.startRecording();
    // this.audioRecorder_screen.record();
    this.videoRecorder_webcam.startRecording();
    // this.audioRecorder_webcam.record();

  }
  listofdevices(): void {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          console.log(device.kind + ': ' + device.label +
            ' id = ' + device.deviceId);

        });
      });


  }
  async getScreenSources(): Promise<void> {
    if (this.e.isElectronApp) {
      this.sources = await this.e.desktopCapturer.getSources({ types: ['window', 'screen'] });
      console.log(this.sources);
    }
  }
  async getWebCamSources(): Promise<void> {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      this.videodevices = devices.filter((d) => d.kind === 'videoinput');
      this.audioinput = devices.filter((d) => d.kind === 'audioinput');
      this.audioOutput = devices.filter((d) => d.kind === 'audiooutput');
      console.log(this.videodevices);
    });
  }
  async delay(ms: number): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  selectScreenPopUp() {
    if (!this.isElectron) {
      console.warn('Not in Electron');
      return;
    }
    this.e.ipcRenderer.send('show-selectScreen', 'Select Screen pop up');
  }

  async saveStreams() {
    await this.videoRecorder_screen.stopRecording((blob) => {
      // console.log(this.videoRecorder_screen.getBlob());
      const temp = new Blob([this.videoRecorder_screen.getBlob()], { type: 'video/mp4' });

      const link = new File([temp], 'screenTest.mp4', {
        type: 'video/mp4'
      });

      // this.screenReplay = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(link));
      this.cameraReplay.nativeElement.src = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(link)) as string;
      this.screenReplay = URL.createObjectURL(link);
      console.log(URL.createObjectURL(link));
    });
    //  this.audioRecorder_screen.stopRecording();
    await this.videoRecorder_webcam.stopRecording((blob) => {
      // console.log(this.videoRecorder_webcam.getBlob());
      const temp = new Blob([this.videoRecorder_webcam.getBlob()], { type: 'video/mp4' });

      const link = new File([temp], 'webcamTest.mp4', {
        type: 'video/mp4'
      });

      // this.screenReplay = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(link));
      this.webcameraReplay.nativeElement.src = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(link)) as string;
      this.webcamReplay = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(link));
      console.log(this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(link)));
    });
    // this.audioRecorder_webcam.stopRecording();


  }
}
