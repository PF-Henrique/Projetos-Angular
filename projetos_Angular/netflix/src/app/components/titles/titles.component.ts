import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss']
})
export class TitlesComponent implements OnInit {

  @Input() title: any;
  @ViewChild('trailer', { static: false }) trailer: ElementRef<HTMLVideoElement>;
  constructor() { }

  ngOnInit() {
  }

  playVideo() {
    this.trailer.nativeElement.currentTime = 0;
  }

  stopVideo() {
    this.trailer.nativeElement.pause();
    this.trailer.nativeElement.play();
  }

  getMuted() {
    return this.trailer.nativeElement.muted;
  }

  toggleSond() {
    this.trailer.nativeElement.muted = !this.trailer.nativeElement.muted;
  }
}
