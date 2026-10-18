
import { useState, useRef, useEffect } from 'react'
import './App.css'

// Put your MP3 files inside public/music/
const tracks = [
  {
    title: 'Track 1',
    src: '/music/song1.mp3'
  },
  {
    title: 'Track 2',
    src: '/music/song2.mp3'
  },
  {
    title: 'Track 3',
    src: '/music/song3.mp3'
  }
]

function App() {
  const audioRef = useRef(null)

  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Play or pause whenever the track or playing state changes
  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Could not play the track:', error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [currentTrack, isPlaying])

  function handlePlay() {
    setIsPlaying(true)
  }

  function handlePause() {
    setIsPlaying(false)
  }

  function handleNextTrack() {
    setCurrentTrack((previousTrack) =>
        (previousTrack + 1) % tracks.length
    )
  }

  function handlePreviousTrack() {
    setCurrentTrack((previousTrack) =>
        (previousTrack - 1 + tracks.length) % tracks.length
    )
  }

  function handleTrackEnded() {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack((previousTrack) => previousTrack + 1)
    } else {
      setIsPlaying(false)
    }
  }

  return (
      <div className="interface">
        <div className="interface-window">
          <h2>{tracks[currentTrack].title}</h2>

          <audio
              ref={audioRef}
              src={tracks[currentTrack].src}
              onEnded={handleTrackEnded}
              preload="metadata"
          />

          <div className="interface-bottom">
            <button
                className="player-button"
                aria-label="Previous track"
                onClick={handlePreviousTrack}
            >
              <img src="/back.png" alt="" />
            </button>

            <button
                className="player-button"
                aria-label="Play"
                onClick={handlePlay}
            >
              <img src="/play.png" alt="" />
            </button>

            <button
                className="player-button"
                aria-label="Pause"
                onClick={handlePause}
            >
              <img src="/pause.png" alt="" />
            </button>

            <button
                className="player-button"
                aria-label="Next track"
                onClick={handleNextTrack}
            >
              <img src="/next.png" alt="" />
            </button>

            <button
                className="player-button"
                aria-label="Options"
                onClick={() => console.log('Options clicked')}
            >
              <img src="/options.png" alt="" />
            </button>
          </div>
        </div>
      </div>
  )
}

export default App
