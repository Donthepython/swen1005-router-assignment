export default function ProgressSlider({ progress, duration, onChange }){
  return(
    <input
      className="progress-slider"
      type="range"
      min="0"
      max={duration || 0}
      step="0.1"
      value={progress}
      onChange={onChange}/>);
}