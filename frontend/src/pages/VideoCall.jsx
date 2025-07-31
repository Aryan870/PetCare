import { useEffect, useRef, useState } from "react";

const VideoCall = ({ roomId }) => {
  const signalingSocket = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);

  const [isCallActive, setIsCallActive] = useState(false);
  const ICE_SERVERS = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

  useEffect(() => {
    signalingSocket.current = new WebSocket("ws://localhost:5000/videocall");

    signalingSocket.current.onopen = () => {
      console.log("✅ Connected to WebSocket Signaling Server");
      signalingSocket.current.send(JSON.stringify({ type: "join-room", roomId }));
    };

    signalingSocket.current.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      console.log("📩 WebSocket Message:", data);

      switch (data.type) {
        case "offer":
          await handleReceiveOffer(data.sdp);
          break;
        case "answer":
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: data.sdp }));
          break;
        case "ice-candidate":
          if (data.candidate) await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
          break;
        default:
          break;
      }
    };

    return () => {
      if (signalingSocket.current) signalingSocket.current.close();
    };
  }, [roomId]);

  const startCall = async () => {
    try {
      if (localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser does not support WebRTC");
      }
  
      // 🔹 Check if we already have an active stream
      if (localVideoRef.current.srcObject) {
        console.log("Stream already exists, reusing...");
        return;
      }
  
      // 🔹 Request camera and mic permissions
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });
  
      // 🔹 Set local video stream
      localVideoRef.current.srcObject = localStream;
  
      // 🔹 Create Peer Connection
      peerConnection.current = new RTCPeerConnection(ICE_SERVERS);
      localStream.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream));
  
      peerConnection.current.ontrack = event => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };
  
      peerConnection.current.onicecandidate = event => {
        if (event.candidate) {
          signalingSocket.current.send(
            JSON.stringify({ type: "ice-candidate", candidate: event.candidate })
          );
        }
      };
  
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
  
      signalingSocket.current.send(JSON.stringify({ type: "offer", sdp: offer.sdp }));
  
      setIsCallActive(true);
    } catch (err) {
      console.error("❌ Error starting call:", err);
      alert("Could not start video call: " + err.message);
    }
  };
  

  const handleReceiveOffer = async (sdp) => {
    try {
      peerConnection.current = new RTCPeerConnection(ICE_SERVERS);
      peerConnection.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          signalingSocket.current.send(JSON.stringify({ type: "ice-candidate", candidate: event.candidate }));
        }
      };

      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.getTracks().forEach((track) => peerConnection.current.addTrack(track, localStream));
      localVideoRef.current.srcObject = localStream;

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp }));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      signalingSocket.current.send(JSON.stringify({ type: "answer", sdp: answer.sdp }));
    } catch (err) {
      console.error("❌ Error handling offer:", err);
      alert("Could not handle offer: " + err.message);
    }
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    setIsCallActive(false);
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Video Call Room: {roomId}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold">Local Video</h2>
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-60 bg-black rounded-xl"></video>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Remote Video</h2>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-60 bg-black rounded-xl"></video>
        </div>
      </div>

      <div className="flex space-x-4">
        <button onClick={startCall} disabled={isCallActive} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Start Call
        </button>
        <button onClick={endCall} disabled={!isCallActive} className="px-4 py-2 bg-red-500 text-white rounded-lg">
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
