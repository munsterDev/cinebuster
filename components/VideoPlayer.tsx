"use client";
import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ embedUrl }: { embedUrl: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  useEffect(() => {
    // Function to extract video source once playback starts
    const extractVideoStream = () => {
      if (!iframeRef.current) return;

      try {
        const iframeDoc = iframeRef.current.contentWindow?.document;
        if (!iframeDoc) return;

        // Look for video elements inside the iframe
        const videoElement = iframeDoc.querySelector("video");
        if (videoElement) {
          const sourceElement = videoElement.querySelector("source");
          if (sourceElement && sourceElement.src) {
            console.log("Extracted video stream:", sourceElement.src);
            setStreamUrl(sourceElement.src);
          }
        }
      } catch (error) {
        console.warn("Unable to access iframe contents due to CORS.");
      }
    };

    // Detect when the iframe loads and attempt to extract the stream
    const checkIframeForStream = setInterval(extractVideoStream, 3000);

    return () => {
      clearInterval(checkIframeForStream);
    };
  }, []);
  return (
    <div className="w-full flex justify-center items-center relative">
      {streamUrl ? (
        // Custom video player
        <video ref={videoRef} controls autoPlay className="w-full h-auto rounded-lg">
          <source src={streamUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Show iframe until the stream is extracted
        <iframe
          ref={iframeRef}
          src={embedUrl}
          width="100%"
          height="500px"
          allowFullScreen
          allow="autoplay; encrypted-media"
          className="rounded-lg"
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;