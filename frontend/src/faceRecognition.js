import * as faceapi from 'face-api.js';
// import ssdModel from './models/ssd_mobilenetv1_model-weights_manifest.json';
// import landmarkModel from './models/face_landmark_68_model-weights_manifest.json';
// import landmarkTinyModel from './models/face_landmark_68_tiny_model-weights_manifest.json';
// import recognitionModel from './models/face_recognition_model-weights_manifest.json';

// Load the required models
export async function loadModels() {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    console.log(MODEL_URL);
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL); // Change this line
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

}


// Detect and recognize faces
export async function recognizeFaces(input, labeledFaceDescriptors) {
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.4 });
    const detections = await faceapi.detectAllFaces(input, options).withFaceLandmarks().withFaceDescriptors();
    console.log("Detected faces:", detections);
    // const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
    // const detections = await faceapi.detectAllFaces(input, options).withFaceLandmarks().withFaceDescriptors();

    // Check if there are any labeledFaceDescriptors
    if (labeledFaceDescriptors.length === 0) {
        console.error('No labeled face descriptors found');
        return [];
    }
    const distanceThreshold = 0.6;

    console.log('Labeled Face Descriptors:', labeledFaceDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, distanceThreshold);

    const results = detections.map((d) => faceMatcher.findBestMatch(d.descriptor));
    return results;
}

// Create labeled face descriptors from user face data
export const createLabeledFaceDescriptors = (users) => {
    return users.map((user) => {
        const faceDataArray = user.faceData.map((value) => parseFloat(value));
        const faceDescriptor = new Float32Array(faceDataArray);
        return new faceapi.LabeledFaceDescriptors(user.employeeID, [faceDescriptor]);
    });
};
