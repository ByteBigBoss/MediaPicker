import React, { useEffect, useState } from 'react';
import { getMediaDevices } from '../utils/getMediaDevices';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  width: auto;
  margin: auto;
  overflow: hidden;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
`;

const DevicePicker = ({ onDeviceChange }) => {
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const { videoDevices, audioInputDevices, audioOutputDevices } = await getMediaDevices();
      setVideoDevices(videoDevices);
      setAudioInputDevices(audioInputDevices);
      setAudioOutputDevices(audioOutputDevices);
    };

    fetchDevices();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onDeviceChange(name, value);
  };

  return (
    <Container >
      <h3>Select Devices</h3>
      <Select name="videoSource" onChange={handleChange}>
        {videoDevices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>{device.label || `Camera ${device.deviceId}`}</option>
        ))}
      </Select>
      <Select name="audioInputSource" onChange={handleChange}>
        {audioInputDevices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>{device.label || `Microphone ${device.deviceId}`}</option>
        ))}
      </Select>
      <Select name="audioOutputSource" onChange={handleChange}>
        {audioOutputDevices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>{device.label || `Speaker ${device.deviceId}`}</option>
        ))}
      </Select>
    </Container>
  );
};

export default DevicePicker;
