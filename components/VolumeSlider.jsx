export default function VolumeSlider({ volume, onChange }) {
  return (
    <input
      className="progress-slider"
      type="range"
      data-no-swipe="true"//implemented to stop the swipe feature from being inacted when users try to use progress sliders
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={onChange}/>);
}