let qrCount = 0;

document.getElementById('generateBtn').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const downloadLink = document.getElementById('downloadLink');
    const qrCountElement = document.getElementById('qrCount');

    // Validate URL
    if (!isValidURL(url)) {
        alert('Please enter a valid URL');
        return;
    }

    qrCodeContainer.innerHTML = '';
    QRCode.toCanvas(document.createElement('canvas'), url, { width: 200 }, function (error, canvas) {
        if (error) console.error(error);
        qrCodeContainer.appendChild(canvas);
        
        // Create download link
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.style.display = 'inline-block';
        });

        // Update QR code count
        qrCount++;
        qrCountElement.textContent = qrCount;
    });
});

function isValidURL(string) {
    var res = string.match(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
    return (res !== null);
}
