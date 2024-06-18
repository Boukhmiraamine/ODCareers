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
        console.log('Local ICE candidate:', event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteStream.addTrack(event.track);
      console.log('Remote track added:', event.track);
    };

    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state change:', this.peerConnection.connectionState);
    };
  }

  async getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, this.localStream);
        console.log('Local track added:', track);
      });
      return this.localStream;
    } catch (error) {
      console.error('Error getting user media:', error);
      throw error;
    }
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
    console.log('ICE candidate added:', candidate);
  }

  getRemoteStream(): MediaStream {
    return this.remoteStream;
  }
}
