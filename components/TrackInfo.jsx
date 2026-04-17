export default function TrackInfo({ title, artist }){
  return (
    <div>
      <h2 id="player-title" style={{ margin: '10px 0 5px 0' }}>
        {title}
      </h2>
      <p id="player-artist" style={{ opacity: 0.8, margin: 0 }}>
        {artist}
      </p></div>);
}