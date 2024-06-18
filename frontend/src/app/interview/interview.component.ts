import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WebRTCService } from '../web-rtc.service';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../websocket.service';

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
  roomId: string = '';

  constructor(
    private webRTCService: WebRTCService,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    try {
      this.localStream = await this.webRTCService.getUserMedia({ video: true, audio: true });
      this.remoteStream = this.webRTCService.getRemoteStream();

      this.route.paramMap.subscribe(params => {
        this.roomId = params.get('id') || '';
        this.webSocketService.joinRoom(this.roomId);

        this.webSocketService.onOffer().subscribe(async (offer: RTCSessionDescriptionInit) => {
          await this.handleRemoteOffer(offer);
        });

        this.webSocketService.onAnswer().subscribe(async (answer: RTCSessionDescriptionInit) => {
          await this.handleRemoteAnswer(answer);
        });

        this.webSocketService.onCandidate().subscribe((candidate: RTCIceCandidateInit) => {
          this.handleNewICECandidate(candidate);
        });
      });
    } catch (error) {
      console.error('Error initializing media:', error);
    }
  }

  ngAfterViewInit() {
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.remoteVideo.nativeElement.srcObject = this.remoteStream;
  }

  async startCall() {
    const offer = await this.webRTCService.createOffer();
    this.webSocketService.sendOffer(this.roomId, offer);
  }

  async answerCall() {
    const answer = await this.webRTCService.createAnswer();
    this.webSocketService.sendAnswer(this.roomId, answer);
  }

  async handleRemoteOffer(offer: RTCSessionDescriptionInit) {
    await this.webRTCService.setRemoteDescription(offer);
    const answer = await this.webRTCService.createAnswer();
    this.webSocketService.sendAnswer(this.roomId, answer);
  }

  async handleRemoteAnswer(answer: RTCSessionDescriptionInit) {
    await this.webRTCService.setRemoteDescription(answer);
  }

  handleNewICECandidate(candidate: RTCIceCandidateInit) {
    this.webRTCService.addIceCandidate(candidate);
  }
}
