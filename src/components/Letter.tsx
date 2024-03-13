import { Player } from "@lottiefiles/react-lottie-player";
import { useRef, useState } from "react";
import "../styles/Letter.css";

interface Props {
  onClick: () => void;
}

const Letter = ({ onClick }: Props) => {
  const playerRef = useRef<Player>(null);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    onClick();
    if (playerRef.current) {
      playerRef.current.play();
    }
    setTimeout(() => {
      setClicked(true);
    }, 500);
  };

  return (
    <>
      <div onClick={handleClick}>
        <Player
          ref={playerRef}
          src="https://lottie.host/d907f832-203c-40b2-b9cb-707c0e5e17f5/6z9Yezo655.json"
          style={{ height: "300px", width: "300px" }}
          keepLastFrame
          speed={0.9}
        ></Player>
        <div
          className={`letter-container badge text-bg-primary text-wrap p-2 ${
            clicked ? "clicked" : ""
          }`}
          style={{ position: "relative", bottom: "50px" }}
        >
          Clicca per aprire!
        </div>
      </div>
    </>
  );
};

export default Letter;
