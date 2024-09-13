import React, { useEffect, useRef, useState } from 'react';

const AudioVisualizer = () => {
    const audioPlayerRef = useRef(null);
    const visualizerRef = useRef(null);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const mp3Files = ['/Brown Tinamou17.mp3', '/Black-capped Tinamou12.mp3'];
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);

    useEffect(() => {
        // Web Audio API setup
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaElementSource(audioPlayerRef.current);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        analyserRef.current.fftSize = 64; // Reduce FFT size for fewer bars
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

        // Event listener for automatically playing the next file
        audioPlayerRef.current.addEventListener('ended', handleAudioEnd);

        // Cleanup on component unmount
        return () => {
            audioPlayerRef.current.removeEventListener('ended', handleAudioEnd);
        };
    }, []);

    const handleAudioEnd = () => {
        setCurrentFileIndex((prevIndex) => (prevIndex + 1) % mp3Files.length);
    };

    useEffect(() => {
        // Play the next audio file when the index changes
        if (audioPlayerRef.current) {
            playNext();
        }
    }, [currentFileIndex]);

    const createBars = () => {
        if (visualizerRef.current) {
            visualizerRef.current.innerHTML = '';
            const bufferLength = analyserRef.current.frequencyBinCount;
            for (let i = 0; i < bufferLength; i++) {
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.width = '5px'; // Initial bar width
                visualizerRef.current.appendChild(bar);
            }
        }
    };

    const updateVisualizer = () => {
        requestAnimationFrame(updateVisualizer);
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const bars = visualizerRef.current.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            const value = dataArrayRef.current[index];
            const maxWidth = 300; // Max width for bars
            bar.style.width = `${(value / 255) * maxWidth}px`; // Change width based on volume
            bar.style.backgroundColor = `rgb(${value}, ${255 - value}, 50)`; // Color change
        });
    };

    const playNext = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.src = mp3Files[currentFileIndex];
            audioPlayerRef.current.volume = 0.1; // Set volume to 10%
            audioPlayerRef.current.play();
            createBars();
            updateVisualizer();
        }
    };

    return (
        <div>
            <audio ref={audioPlayerRef} controls></audio>
            <button onClick={playNext}>start</button>
            <div id="visualizer" ref={visualizerRef} style={visualizerStyle}></div>
        </div>
    );
};

// Inline styles for visualizer and bars
const visualizerStyle = {
    width: '100%',
    height: '30px',
    background: '#000',
    display: 'flex',
    alignItems: 'center',
};

export default AudioVisualizer;
