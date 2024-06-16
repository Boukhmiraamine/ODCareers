import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WebRTCService } from '../web-rtc.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit, AfterViewInit {
  @ViewChild('localVideo') localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
  localStream!: MediaStream;
  remoteStream!: MediaStream;

  constructor(private webRTCService: WebRTCService) {}

  async ngOnInit() {
    // Get user media
    this.localStream = await this.webRTCService.getUserMedia({ video: true, audio: true });

    // Access the remote stream
    this.remoteStream = this.webRTCService.getRemoteStream();
  }

  ngAfterViewInit() {
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.remoteVideo.nativeElement.srcObject = this.remoteStream;
  }

  async startCall() {
    const offer = await this.webRTCService.createOffer();
    // Send offer to remote peer via signaling server
  }

  async answerCall() {
    const answer = await this.webRTCService.createAnswer();
    // Send answer to remote peer via signaling server
  }

  async handleRemoteOffer(offer: RTCSessionDescriptionInit) {
    await this.webRTCService.setRemoteDescription(offer);
    const answer = await this.webRTCService.createAnswer();
    // Send answer to remote peer via signaling server
  }

  async handleRemoteAnswer(answer: RTCSessionDescriptionInit) {
    await this.webRTCService.setRemoteDescription(answer);
  }

  handleNewICECandidate(candidate: RTCIceCandidateInit) {
    this.webRTCService.addIceCandidate(candidate);
  }
}
