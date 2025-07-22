// static/js/checklist.js

document.addEventListener('DOMContentLoaded', () => {
    const startRoomScanBtn = document.getElementById('startRoomScanBtn');

    if (startRoomScanBtn) {
        startRoomScanBtn.addEventListener('click', async () => {
            console.log('Start Room Scan button clicked. Attempting permissions and navigating...');
            
            // Request camera permissions for room scan
            console.log('Requesting camera permission for room scan...');

            let permissionsGranted = false;
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                // If getUserMedia succeeds, permissions were granted
                permissionsGranted = true;
                // Stop the temporary stream immediately after checking
                stream.getTracks().forEach(track => track.stop());
                console.log('Camera access granted for room scan.');

            } catch (err) {
                console.warn('Camera access denied or error:', err);
                permissionsGranted = false;
            }

            if (permissionsGranted) {
                console.log('Permissions granted. Navigating to exam page.');
                window.location.href = 'exam.html'; // Navigate to the exam page
            } else {
                console.log('Permissions denied. Navigating to error page.');
                // Pass a message to the error page
                window.location.href = 'error.html?message=' + encodeURIComponent('Camera access was denied. Camera permission is required for the room scan to take the exam.');
            }
        });
    }

    console.log('Checklist page loaded.');
});

// Function to check camera/mic permissions (placeholder for future use)
function checkPermissions() {
    console.log('Checking camera and microphone permissions (placeholder)...');
    // Real implementation will use navigator.mediaDevices.getUserMedia()
    // and check the state of permissions.
    return false; // Placeholder return
}