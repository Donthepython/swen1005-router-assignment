import { useState } from "react";
export default function PlayerControls({isPlaying, goToPreviousTrack, togglePlayPause, goToNextTrack,})
 {
  return(
    <div>
      <button onClick={goToPreviousTrack}>Previous</button>
      <button onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={goToNextTrack}>Next</button>
    </div>);
}