import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const VideoCall = ({ roomId }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket("ws://localhost:5000/video-call");

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            localVideoRef.current.srcObject = stream;
            
            peerConnection.current = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
            });

            stream.getTracks().forEach(track => peerConnection.current.addTrack(track, stream));

            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.current.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
                }
            };

            peerConnection.current.ontrack = (event) => {
                remoteVideoRef.current.srcObject = event.streams[0];
            };

            socket.current.onmessage = async (message) => {
                const data = JSON.parse(message.data);

                if (data.type === "offer") {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                    const answer = await peerConnection.current.createAnswer();
                    await peerConnection.current.setLocalDescription(answer);
                    socket.current.send(JSON.stringify({ type: "answer", answer }));
                } else if (data.type === "answer") {
                    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
                } else if (data.type === "candidate") {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
                }
            };

            peerConnection.current.createOffer().then(offer => {
                peerConnection.current.setLocalDescription(offer);
                socket.current.send(JSON.stringify({ type: "offer", offer }));
            });

        });

        return () => {
            socket.current.close();
        };
    }, []);

    return (
        <div>
            <video ref={localVideoRef} autoPlay playsInline muted />
            <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
    );
};

export default VideoCall;
