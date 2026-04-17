import { useState } from "react";
import { useNavigate } from "react-router";
import { tracks } from "~/tracks";

export default function HomeRoute() {
  const [search, setSearch] = useState("");
  const [playlist, setPlaylist] = useState(tracks);
  const navigate = useNavigate();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {//search bar handler
    const value = e.target.value;
    setSearch(value);

    const filtered = tracks.filter((song) => {
      return (
        song.title.toLowerCase().includes(value.toLowerCase())||song.artist.toLowerCase().includes(value.toLowerCase()) );//Reads the search bar input and narrows it down to the song name or the artist name depending on the user's search
    });

    setPlaylist(filtered);
  }

  function handleSongClick(song: (typeof tracks)[number]) {
    const index = tracks.findIndex(
      (track) => track.title == song.title && track.artist == song.artist
    );

    localStorage.setItem("player-track-index", index.toString());//stores the clicked song which then gets used in the player to correlate the clicked song to the screen 2 song, before this it would just start with the first song
    navigate("/player");
  }

  return (
    <main>
      <div >
        <div id="library-screen">
          <div id="search-bar-container">
            <input
              type="text"
              id="search-bar"
              placeholder="🔍 Search songs or artists..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div id="playlistwrapper">
            <ul id="song-list">
              {playlist.map((song, i) => (
                <li
                  key={i}
                  className="song-item"
                  onClick={() => handleSongClick(song)}
                >
                  <p className="song-title">
                    <strong>{song.title}</strong>
                  </p>
                  <p className="song-artist">{song.artist}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}