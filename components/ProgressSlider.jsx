export default function ProgressSlider({ progress, duration, onChange }){
  return(
    <input
      className="progress-slider"
      type="range"
      data-no-swipe="true"//implemented to stop the swipe feature from being inacted when users try to use progress sliders
      min="0"
      max={duration || 0}
      step="0.1"
      value={progress}
      onChange={onChange}/>);
}