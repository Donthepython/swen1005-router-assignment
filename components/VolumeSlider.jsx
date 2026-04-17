export default function VolumeSlider({ volume, onChange }) {
  return (
    <input
      className="progress-slider"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={onChange}/>);
}