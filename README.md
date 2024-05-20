# MediaPicker Project

## Overview

The MediaPicker project is a comprehensive solution designed to enable users to capture media (camera, audio, and speaker input) from their devices and apply filters to videos. This project aims to provide a robust and flexible framework for integrating media capturing and processing capabilities into various applications.

## Features

- **Camera Integration**: Capture video directly from the device's camera.
- **Audio Recording**: Record audio using the device's microphone.
- **Speaker Input**: Capture audio output from the device's speaker.
- **Video Filters**: Apply a variety of filters to enhance or modify the captured video.
- **Cross-Platform Support**: Compatible with multiple platforms, ensuring a wide range of device compatibility.

## Installation

To install the MediaPicker project, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ByteBigBoss/MediaPicker.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd MediaPicker
    ```

3. **Install Dependencies**:
    - For Node.js (if applicable):
        ```bash
        npm install
        ```

4. **Build the Project**:
    ```bash
    npm run build
    ```

## Contributing

We welcome contributions to enhance the MediaPicker project. To contribute, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button on the top right corner of this page.
2. **Clone Your Fork**:
    ```bash
    git clone https://github.com/ByteBigBoss/MediaPicker.git
    ```
3. **Create a Branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4. **Make Your Changes**: Implement your feature or fix a bug.
5. **Commit Your Changes**:
    ```bash
    git commit -m "Add feature/fix: description of the change"
    ```
6. **Push to Your Fork**:
    ```bash
    git push origin feature/your-feature-name
    ```
7. **Create a Pull Request**: Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or issues, please open an issue on the [GitHub repository](https://github.com/yourusername/MediaPicker) or contact the project maintainers.


## Usage

After installation, you can start using the MediaPicker project in your application. Below is an example of how to integrate and use the various features:

1. **Create `getMediaDevices.js` Utility File**:

    ```javascript
    // utils/getMediaDevices.js
    export const getMediaDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return {
        videoDevices: devices.filter(device => device.kind === 'videoinput'),
        audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
        audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
      };
    };
    ```

2. **Create `MediaPicker.js` Component**:

    ```javascript
    // components/MediaPicker.js
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

    const MediaPicker = () => {
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
            <Title>Volume</Title>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              onChange={handleVolumeChange}
              className="text-yellow-50"
              style={{ marginBottom: "50px", marginTop: "20px" }}
            />

            <Title>Filter</Title>
            <Filters>
              <FilterIconContainer>
                <FilterIconBox onClick={() => { applyVideoFilter("grayscale(100%)"); setFilterBtn(1) }} className={`${filterBtn == 1 ? "bg-[#3CE666] text-white" : "bg-[#0D150E]"}`}>
                  <Blend />
                </FilterIconBox>
              </FilterIconContainer>
              <FilterIconContainer>
                <FilterIconBox onClick={() => { applyVideoFilter("sepia(100%)"); setFilterBtn(2) }} className={`${filterBtn == 2 ? "bg-[#3CE666] text-white" : "bg-[#0D150E]"}`}>
                  <Paintbrush />
                </FilterIconBox>
              </FilterIconContainer>
              <FilterIconContainer>
                <FilterIconBox onClick={() => { applyVideoFilter("none"); setFilterBtn(3) }} className={`${filterBtn == 3 ? "bg-[#3CE666] text-white" : "bg-[#0D150E]"}`}>
                  <CircleOff />
                </FilterIconBox>
              </FilterIconContainer>
            </Filters>
          </Section>
        </Container>
      );
    };

    export default MediaPicker;
    ```

3. **Create `page.js` for Application Entry Point**:

    ```javascript
    "use client"
    import React from 'react';
    import MediaPicker from '../../components/MediaPicker';

    const App = () => {
      return (
        <div className='w-full'>
          <div className='flex flex-col items-center w-full text-white'>
            <h1 className='text-[2rem] font-medium'>Media Picker</h1>
            <h3 className='text-[1rem] opacity-80'>Developed by @bytebigboss</h3>
          </div>
          <MediaPicker />
        </div>
      );
    };

    export default App;
    ```

4. **Running the Application**:

    - Ensure you have all necessary dependencies installed, including `react`, `styled-components`, and `lucide-react`.
    - Start your development server using a command like `npm run dev` or `yarn start` depending on your package manager.
    - Open your browser and navigate to the application to see the MediaPicker in action.

5. **Using the Features**:

    - **Select Devices**: Use the dropdown menus to select your desired camera, microphone, and speaker.
    - **Toggle Video/Audio**: Click the video and audio icons to enable/disable the respective streams.
    - **Adjust Volume**: Use the volume slider to adjust the microphone volume.
    - **Apply Filters**: Click on the filter icons to apply grayscale, sepia, or remove any filters from the video stream.

This comprehensive setup ensures a fully functional media picker with device selection, control over video and audio streams, volume adjustment, and video filters. Customize the styles and behavior further as needed for your specific use case.
