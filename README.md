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
    git clone https://github.com/ByteBigBoss/MediaPicker
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

## Usage

After installation, you can start using the MediaPicker project in your application. Below is an example of how to integrate and use the various features:

```javascript
import { MediaPicker } from 'mediapicker';

// Initialize MediaPicker
const mediaPicker = new MediaPicker();

// Capture video from camera
mediaPicker.captureVideo()
    .then(videoStream => {
        console.log('Video captured:', videoStream);
        // Apply filters to the video
        mediaPicker.applyFilter(videoStream, 'filterName')
            .then(filteredVideo => {
                console.log('Filtered video:', filteredVideo);
            })
            .catch(error => console.error('Error applying filter:', error));
    })
    .catch(error => console.error('Error capturing video:', error));

// Record audio
mediaPicker.recordAudio()
    .then(audioStream => {
        console.log('Audio recorded:', audioStream);
    })
    .catch(error => console.error('Error recording audio:', error));
