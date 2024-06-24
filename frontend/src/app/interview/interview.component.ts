import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WebRTCService } from '../web-rtc.service';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../websocket.service';
import { AuthService } from '../auth-service.service';
import { ProfileService } from '../profile.service';

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
  isMuted: boolean = false;
  isCameraOn: boolean = true;
  isRemoteCameraOn: boolean = false;
  localProfilePicture: string = 'path/to/default-local-profile-picture.jpg';
  remoteProfilePicture: string = 'path/to/default-remote-profile-picture.jpg';

  constructor(
    private webRTCService: WebRTCService,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  async ngOnInit() {
    try {
      const userId = this.authService.getLoggedInUserId();
      if (userId) {
        this.profileService.getProfile(userId).subscribe(profile => {
          this.localProfilePicture = profile.profilePicture || this.localProfilePicture;
        });
      }

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

      this.setupVideoStreams();
    } catch (error) {
      console.error('Error initializing media:', error);
    }
  }

  ngAfterViewInit() {
    this.setupVideoStreams();
  }

  private setupVideoStreams() {
    if (this.localStream) {
      this.localVideo.nativeElement.srcObject = this.localStream;
    }

    if (this.remoteStream) {
      this.remoteVideo.nativeElement.srcObject = this.remoteStream;
    }
  }

  async startCall() {
    try {
      const offer = await this.webRTCService.createOffer();
      this.webSocketService.sendOffer(this.roomId, offer);
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }

  async answerCall() {
    try {
      const answer = await this.webRTCService.createAnswer();
      this.webSocketService.sendAnswer(this.roomId, answer);
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  }

  async handleRemoteOffer(offer: RTCSessionDescriptionInit) {
    try {
      await this.webRTCService.setRemoteDescription(offer);
      const answer = await this.webRTCService.createAnswer();
      this.webSocketService.sendAnswer(this.roomId, answer);
      this.isRemoteCameraOn = true;
    } catch (error) {
      console.error('Error handling remote offer:', error);
    }
  }

  async handleRemoteAnswer(answer: RTCSessionDescriptionInit) {
    try {
      await this.webRTCService.setRemoteDescription(answer);
      this.isRemoteCameraOn = true;
    } catch (error) {
      console.error('Error handling remote answer:', error);
    }
  }

  handleNewICECandidate(candidate: RTCIceCandidateInit) {
    this.webRTCService.addIceCandidate(candidate);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.localStream.getAudioTracks().forEach(track => track.enabled = !this.isMuted);
  }

  toggleCamera() {
    this.isCameraOn = !this.isCameraOn;
    this.localStream.getVideoTracks().forEach(track => track.enabled = this.isCameraOn);
  }

  hangUp() {
    this.webRTCService.hangUp(); // Implement hangUp logic in WebRTCService
  }
}
