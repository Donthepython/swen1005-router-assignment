
import { Link } from 'react-router';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import {tracks} from "~/tracks";
import CoverArt from '../../components/CoverArt';
import TrackInfo from '../../components/TrackInfo';
import ProgressSlider from '../../components/ProgressSlider';
import VolumeSlider from '../../components/VolumeSlider';
import PlayerControls from '../../components/PlayerControls';

export default function PlayerRoute() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {//used chatgpt to help me make the correlation between player and home and how to make sure my song picked matches up
    const savedTrack = localStorage.getItem("player-track-index");
    if (savedTrack !== null) {
        return Number(savedTrack);}
    return 0;
});
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const currentTrack = tracks[currentTrackIndex];
    const [touchStart, setTouchStart] = useState(0);//handles mobile swiping

    const togglePlayPause = async () => {//Lab 7 code to handle pauses and plays
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            await audio.play();
            setIsPlaying(true);
        }
    };

    const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {//Lab 7 code
        const audio = audioRef.current;
        const nextTime = Number(event.target.value);
        if (!audio) return;
        audio.currentTime = nextTime;
        setProgress(nextTime);
    };

    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        const nextVolume = Number(event.target.value);
        setVolume(nextVolume);
        if (audio) audio.volume = nextVolume;
    };

    const goToNextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
        setProgress(0);
    };
    const goToPreviousTrack = () => {
        setCurrentTrackIndex((prev) =>
        prev === 0 ? tracks.length - 1 : prev - 1
        );
        setProgress(0);
    };
    
    useEffect(() => {
        const savedVolume = localStorage.getItem('player-volume');
        const savedTrack = localStorage.getItem('player-track-index');
        if (savedVolume !== null) setVolume(Number(savedVolume));
        if (savedTrack !== null) setCurrentTrackIndex(Number(savedTrack));
        
        }, []
    );

    useEffect(() => {//Handles the progress bar's movement
        const audio = audioRef.current;
        if (!audio) return;
        const updateProgress = () => {
            setProgress(audio.currentTime);
        };
        const updateDuration = () => {
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
        }, [currentTrackIndex]);   

   function handleTouchStart(e: React.TouchEvent<HTMLDivElement>){//This handles the mobile swipes
        setTouchStart(e.touches[0].clientX);
    }

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>){//gemini generation was used as a model for how to execute this
        const touchEnd = e.changedTouches[0].clientX;
        if (touchEnd < touchStart - 50){
            goToPreviousTrack();
        }
        if (touchEnd > touchStart + 50){
            goToNextTrack();
        }
    }
    useEffect(() => {
        localStorage.setItem('player-volume', String(volume));
        localStorage.setItem('player-track-index', String(currentTrackIndex));
        }, [volume, currentTrackIndex]);
    
    useEffect(() => {//Lets the song instantly play upon click
       const audio = audioRef.current;
       if (!audio) return;
        audio.play()
            .then(() => {
            setIsPlaying(true);
            })
            .catch(() => {
            setIsPlaying(false);
            });
        }, [currentTrackIndex]);


    return <main>{//optimized using reusable react components
        <div id="player-screen" className="screen"onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <Link to={'/'} id="back-button">← Back</Link>           
            <CoverArt
                cover={currentTrack.cover}
                title={currentTrack.title}
                onClick={togglePlayPause}/>
            <TrackInfo
                title={currentTrack.title}
                artist={currentTrack.artist}/>
            <ProgressSlider
                progress={progress}
                duration={duration}
                onChange={handleSeek}/>
            <VolumeSlider
                volume={volume}
                onChange={handleVolumeChange}/>
            <PlayerControls
                isPlaying={isPlaying}
                goToPreviousTrack={goToPreviousTrack}
                togglePlayPause={togglePlayPause}
                goToNextTrack={goToNextTrack}/>
         <audio ref={audioRef} src={currentTrack.src} preload="metadata"/>
     </div>}
    </main>
    };

    
        