// components/MediaTest.js
import React, { useEffect, useState, useRef } from "react";
import { getMediaDevices } from "../utils/getMediaDevices";
import styled from "styled-components";
import {
  Paintbrush,
  Blend,
  CircleOff,
  Mic,
  Video as VideoIC,
  VideoOff,
  MicOff,
} from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 30px;
  padding: 4rem 4rem;
  justify-content: center;
  overflow: auto;
  
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
`;

const Filters = styled.div`
display: flex;
gap: 26px;
`;

const Section = styled.section`
  width: 100%;
  max-width: 340px;
  height: fit-content;
  background-color: #0d150e;
  border: 1px solid #ffffff1f;
  min-height: 200px;
  border-radius: 24px;
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  flex-direction: column;

`;

const VideoSection = styled.section`
  width: 100%;
  max-width: 340px;
  height: fit-content;
  background-color: #0d150e;
  border: 1px solid #ffffff1f;
  min-height: 200px;
  border-radius: 24px;
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  align-items: center;
  flex-direction: column;

`;


const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: relative;
  margin-top: 26px;
`;
const Image = styled.img`
  position: absolute;
  border-radius: 100%;
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  max-width: 200px;
  height: 200px;
  max-height: 200px;
  background-size: cover;
  border-radius: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  color: #3ce666;
  gap: 30px;
  margin-top: 50px;
  margin-bottom: 26px;
`;

const IconBox = styled.button`
  background-color: #dff2e41f;
  padding: 8px 14px;
  border-radius: 6px;
`;

const FilterIconBox = styled.button`
width: 80px;
height: 80px;
display: flex;
justify-content: center;
align-items: center;
border: 1px #ffffff1f solid;
border-radius: 6px;
`;

const FilterIconContainer = styled.div`
  display: flex;
  color: #3ce666;
  gap: 30px;
  margin-top: 20px;
  margin-bottom: 26px;
`;

const Title = styled.div`
  color: white;
  font-size: 1.5rem;
  text-align: start;
`;

const SelectSet = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  margin-top: 20px;
`;

const MediaTest = () => {
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState("");
  const [selectedAudioInputDevice, setSelectedAudioInputDevice] = useState("");
  const [selectedAudioOutputDevice, setSelectedAudioOutputDevice] =
    useState("");
  const [stream, setStream] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const videoRef = useRef(null);
  const [filterBtn, setFilterBtn] = useState(3);

  useEffect(() => {
    const fetchDevices = async () => {
      const { videoDevices, audioInputDevices, audioOutputDevices } =
        await getMediaDevices();
      setVideoDevices(videoDevices);
      setAudioInputDevices(audioInputDevices);
      setAudioOutputDevices(audioOutputDevices);
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    if (stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleDeviceChange = async (name, value) => {
    if (name === "videoSource") {
      setSelectedVideoDevice(value);
    } else if (name === "audioInputSource") {
      setSelectedAudioInputDevice(value);
    } else if (name === "audioOutputSource") {
      setSelectedAudioOutputDevice(value);
      const videoElement = videoRef.current;
      if ("sinkId" in videoElement) {
        videoElement.setSinkId(value);
      }
    }
    await getStream();
  };

  const getStream = async () => {
    const constraints = {
      video: {
        deviceId: selectedVideoDevice
          ? { exact: selectedVideoDevice }
          : undefined,
      },
      audio: {
        deviceId: selectedAudioInputDevice
          ? { exact: selectedAudioInputDevice }
          : undefined,
      },
    };
    try {
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(newStream);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsVideoOn(track.enabled);
      });
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsAudioOn(track.enabled);
      });
    }
  };

  const handleVolumeChange = (event) => {
    const audioTrack = stream.getAudioTracks()[0];
    const audioContext = new AudioContext();
    const mediaStreamSource = audioContext.createMediaStreamSource(
      new MediaStream([audioTrack])
    );
    const gainNode = audioContext.createGain();
    gainNode.gain.value = event.target.value;
    mediaStreamSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
  };

  const applyVideoFilter = (filter) => {
    videoRef.current.style.filter = filter;
  };

  return (
    <Container className="">
      <Section>
        <div className="text-white">
          <Title className="">Select Devices</Title>
        </div>

        <SelectSet>
          <Select
            name="videoSource"
            onChange={(e) => handleDeviceChange(e.target.name, e.target.value)}
            value={selectedVideoDevice}
          >
            <option value="">Select Camera</option>
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </Select>
          <Select
            name="audioInputSource"
            onChange={(e) => handleDeviceChange(e.target.name, e.target.value)}
            value={selectedAudioInputDevice}
          >
            <option value="">Select Microphone</option>
            {audioInputDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Microphone ${device.deviceId}`}
              </option>
            ))}
          </Select>
          <Select
            name="audioOutputSource"
            onChange={(e) => handleDeviceChange(e.target.name, e.target.value)}
            value={selectedAudioOutputDevice}
          >
            <option value="">Select Speaker</option>
            {audioOutputDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Speaker ${device.deviceId}`}
              </option>
            ))}
          </Select>
        </SelectSet>
      </Section>
      <VideoSection>
        <ImageContainer>
          <Video ref={videoRef} autoPlay playsInline />
        </ImageContainer>

        <IconContainer>
          <IconBox onClick={toggleVideo}>
            {isVideoOn ? <VideoIC /> : <VideoOff />}
          </IconBox>

          <IconBox onClick={toggleAudio}>
            {isAudioOn ? <Mic /> : <MicOff />}
          </IconBox>
        </IconContainer>
      </VideoSection>

      <Section>
        {/* ...existing elements... */}
        <Title>Volume</Title>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          onChange={handleVolumeChange}
          className="text-yellow-50"
          style={{marginBottom:"50px", marginTop:"20px",}}
        />

        <Title>Filter</Title>
          <Filters>
          <FilterIconContainer>
          <FilterIconBox onClick={() =>{ applyVideoFilter("grayscale(100%)"); setFilterBtn(1)}} className={`${filterBtn == 1 ? "bg-[#3CE666] text-white":"bg-[#0D150E]"}`}>
            <Blend/>
          </FilterIconBox>
        </FilterIconContainer>
        <FilterIconContainer>
          <FilterIconBox onClick={() => {applyVideoFilter("sepia(100%)"); setFilterBtn(2)}} className={`${filterBtn == 2 ? "bg-[#3CE666] text-white":"bg-[#0D150E]"}`}>
            <Paintbrush/>
          </FilterIconBox>
        </FilterIconContainer>
        <FilterIconContainer>
         <FilterIconBox onClick={() => {applyVideoFilter("none"); setFilterBtn(3)}} className={`${filterBtn == 3 ? "bg-[#3CE666] text-white":"bg-[#0D150E]"}`}>
          <CircleOff/>
         </FilterIconBox>
        </FilterIconContainer>
          </Filters>
      </Section>
    </Container>
  );
};

export default MediaTest;
