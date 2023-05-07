import * as faceapi from '@vladmandic/face-api';
// Load the required models
export async function loadModels() {
    await faceapi.loadSsdMobilenetv1Model(`${process.env.PUBLIC_URL}/models`);
    await faceapi.loadFaceLandmarkModel(`${process.env.PUBLIC_URL}/models`);
    await faceapi.loadFaceRecognitionModel(`${process.env.PUBLIC_URL}/models`);
}


// Detect and recognize faces
export async function recognizeFaces(input, labeledFaceDescriptors) {
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });
    const detections = await faceapi.detectAllFaces(input, options).withFaceLandmarks().withFaceDescriptors();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    const results = detections.map((d) => faceMatcher.findBestMatch(d.descriptor));
    return results;
}

// Create labeled face descriptors from user face data
export function createLabeledFaceDescriptors(users) {
    return users.map((user) => {
        const faceData = user.faceData.map((fd) => new Float32Array(fd));
        const faceDescriptors = faceData;
        return new faceapi.LabeledFaceDescriptors(user.employeeID, faceDescriptors);
    });
}
