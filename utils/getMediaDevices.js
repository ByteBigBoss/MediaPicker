// utils/getMediaDevices.js
export const getMediaDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return {
    videoDevices: devices.filter(device => device.kind === 'videoinput'),
    audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
    audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
  };
};
