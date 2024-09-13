import React, { useRef, useEffect } from 'react';

const AudioVisualizer = () => {
    const audioPlayerRef = useRef(null);
    const visualizerRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const barsRef = useRef([]);
    const mp3Files = ['Brown Tinamou17.mp3', 'Black-capped Tinamou12.mp3'];
    let currentFileIndex = 0;

    const initAudioContext = () => {
        if (!audioContextRef.current) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(audioPlayerRef.current);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 64; // Reduce FFT size for fewer bars
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            dataArrayRef.current = dataArray;
            createBars(bufferLength);
        }
    };

    const createBars = (bufferLength) => {
        // Create bar elements only once and store them in the ref
        barsRef.current = Array.from({ length: bufferLength }, (_, i) => ({
            opacity: 0,
            backgroundColor: 'rgb(0, 0, 255)',
        }));
    };

    const updateVisualizer = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        const analyser = analyserRef.current;
        const dataArray = dataArrayRef.current;
        analyser.getByteFrequencyData(dataArray);

        barsRef.current.forEach((bar, index) => {
            const value = dataArray[index];
            const brightness = Math.max(0.2, value / 255); // Enhance minimum brightness level
            bar.opacity = brightness * 1.2; // Increase brightness slightly
            bar.backgroundColor = `rgb(${value}, ${100 + value / 2}, 255)`; // Enhance visual effect
        });

        // Trigger React to re-render with updated bars
        visualizerRef.current.innerHTML = ''; // Clear current bars
        barsRef.current.forEach((bar) => {
            const barElement = document.createElement('div');
            barElement.style.height = '100%';
            barElement.style.width = '5px';
            barElement.style.opacity = bar.opacity;
            barElement.style.backgroundColor = bar.backgroundColor;
            barElement.style.transition = 'opacity 0.05s, background-color 0.05s';
            visualizerRef.current.appendChild(barElement);
        });

        requestAnimationFrame(updateVisualizer);
    };

    const playNext = () => {
        initAudioContext();
        const audioPlayer = audioPlayerRef.current;
        audioPlayer.src = mp3Files[currentFileIndex];
        audioPlayer.volume = 0.1; // Set volume to 10%
        audioPlayer
            .play()
            .then(() => {
                updateVisualizer();
            })
            .catch((error) => {
                console.error('Error playing audio:', error);
                alert('Please click the "Start" button to play the audio.');
            });
    };

    useEffect(() => {
        const audioPlayer = audioPlayerRef.current;

        const handleEnded = () => {
            currentFileIndex = (currentFileIndex + 1) % mp3Files.length;
            playNext();
        };

        audioPlayer.addEventListener('ended', handleEnded);

        return () => {
            audioPlayer.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <div>
            <audio ref={audioPlayerRef} controls></audio>
            <button onClick={playNext}>Start</button>
            <div
                ref={visualizerRef}
                style={{
                    width: '300px',
                    height: '30px',
                    background: '#000',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            ></div>
        </div>
    );
};

export default AudioVisualizer;
