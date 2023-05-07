import * as faceapi from '@vladmandic/face-api';
// import ssdModel from './models/ssd_mobilenetv1_model-weights_manifest.json';
// import landmarkModel from './models/face_landmark_68_model-weights_manifest.json';
// import landmarkTinyModel from './models/face_landmark_68_tiny_model-weights_manifest.json';
// import recognitionModel from './models/face_recognition_model-weights_manifest.json';

// Load the required models
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
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
