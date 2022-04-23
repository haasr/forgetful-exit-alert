const gpio = require('onoff').Gpio;
const child_process = require('child_process');

const CONTACT_PIN = 16;
const MESSAGE = (
    "Remember your ID card, wallet, and laptop charger!"
);

child_process.spawn('gpio', ['-g', 'mode', '16', 'up']); // Enable the internal pull-up resistor.

// Rising -> Circuit is disconnected (door open disconnecting contacts)
let circuit = new gpio(CONTACT_PIN, 'in', 'rising', { debounceTimeout: 10 });

// Trigger when circuit broken.
circuit.watch(function(err, value) {
    if (err) console.log('Error: ', err, err.stack);
    // TTS call here
    child_process.exec('simple_google_tts -p en ' + MESSAGE,
    (err, stdout, stderr) => {
        if (err) console.log(err.message);
        if (stderr) console.log(stderr);
    });
});

process.on('SIGINT', function() {
	circuit.unexport();
	console.log('\nPin connection unexported; Exiting.');
	process.exit();
});