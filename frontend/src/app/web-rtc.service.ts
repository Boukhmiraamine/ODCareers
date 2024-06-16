import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRTCService {
  private peerConnection: RTCPeerConnection;
  private localStream: MediaStream;
  private remoteStream: MediaStream;

  constructor() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    // Initialize MediaStreams
    this.localStream = new MediaStream();
    this.remoteStream = new MediaStream();

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Handle ICE candidate event
        // Emit the candidate to the signaling server
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteStream.addTrack(event.track);
    };
  }

  async getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });
    return this.localStream;
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(): Promise<RTCSessionDescriptionInit> {
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(sdp: RTCSessionDescriptionInit): Promise<void> {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
  }

  addIceCandidate(candidate: RTCIceCandidateInit): void {
    this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }

  getRemoteStream(): MediaStream {
    return this.remoteStream;
  }
}
