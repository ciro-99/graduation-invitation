import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Letter from "./components/Letter";
import Confetti from "react-confetti";
import { Container } from "react-bootstrap";
import Card from "./components/Card";
import Countdown from "./components/Countdown";
import { Player } from "@lottiefiles/react-lottie-player";

interface CardsOpenState {
  countdown: boolean;
  location: boolean;
  invitati: boolean;
}

function App() {
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hideLetter, setHideLetter] = useState(false);
  const [startFade, setStartFade] = useState(false);
  const [cardsOpen, setCardsOpen] = useState<CardsOpenState>({
    countdown: false,
    location: false,
    invitati: false,
  });
  const [showClickAnimation, setShowClickAnimation] = useState(false);

  const handleOpenInvitation = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setStartFade(true);
      setTimeout(() => {
        setHideLetter(true);
        setInvitationOpen(true);
        setShowClickAnimation(true);
        setTimeout(() => {
          setShowConfetti(false);
          setTimeout(() => {
            setShowClickAnimation(false);
          }, 4000);
        }, 4000);
      }, 1000);
    }, 3000);
  };

  const toggleCard = (cardName: keyof CardsOpenState) => {
    setCardsOpen((prevState) => ({
      ...prevState,
      [cardName]: !prevState[cardName],
    }));
  };

  return (
    <Container fluid>
      {showConfetti && (
        <Confetti className={`${startFade ? "fade-out-6" : ""}`} />
      )}
      {!hideLetter && (
        <div className={`${startFade ? "fade-out" : ""}`}>
          <Letter onClick={handleOpenInvitation} />
        </div>
      )}
      {invitationOpen && (
        <div className="row zoom-out">
          <div className="col-sm-6 mb-sm-0 p-0">
            <div className="col-sm-6 mb-3 mb-sm-0" style={{ width: "300px" }}>
              <div className="card">
                <div className="card-body">
                  <h5
                    className="card-title text-start"
                    style={{ cursor: "pointer" }}
                  >
                    🥳 Festa di Laurea
                  </h5>
                  <h6
                    className="card-subtitle mb-2 text-body-secondary text-start"
                    style={{ width: "200px" }}
                  >
                    Laurea Magistrale in Ingegneria Informatica
                  </h6>
                  <h3 className="card-text text-start">Ciro Marrazzo</h3>
                  <div className="position-absolute top-0 start-100 translate-middle ms-1">
                    <div className="icon-wrapper">
                      <img
                        className="icon"
                        src="https://svgshare.com/i/14FN.svg"
                        style={{
                          transform: "rotate(75deg)",
                        }}
                        alt="Cappello"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={() => toggleCard("countdown")}
              className="col-sm-6 mb-3 mb-sm-0"
              style={{ width: "300px" }}
            >
              <div className="card">
                <div className="card-body">
                  <h5
                    className="card-title text-start"
                    style={{ cursor: "pointer" }}
                  >
                    ⌚️ Quando?
                  </h5>
                  {cardsOpen.countdown && (
                    <p className="card-text text-start">
                      30 Marzo 2024, ore 13:30
                    </p>
                  )}
                </div>
                {cardsOpen.countdown && <Countdown />}
                {showClickAnimation && (
                  <div
                    className="position-absolute translate-middle ms-1 fade-in-out"
                    style={{ top: "35%", left: "90%", rotate: "-10deg" }}
                  >
                    <Player
                      autoplay
                      loop
                      src="https://lottie.host/5b78afc2-c73e-4742-bb13-abbf7a07d4fd/zx3XTz2YHo.json"
                      style={{ height: "200px", width: "200px" }}
                      speed={0.9}
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={() => {
                toggleCard("location");
              }}
            >
              <Card
                title="📍 Location"
                text="Ristorante bellissimo!"
                buttonText="Indicazioni"
                href="https://www.google.it/maps/preview"
                srcImg="https://media-cdn.tripadvisor.com/media/photo-s/0b/79/a9/97/by-the-sea-restaurant.jpg"
                icon="FaMapSigns"
                isOpen={cardsOpen.location}
              />
            </div>
            <div onClick={() => toggleCard("invitati")}>
              <Card
                title="🌝 Invitati"
                text=""
                buttonText="Scopri se sei in lista!"
                icon="IoMdPersonAdd"
                href=""
                isOpen={cardsOpen.invitati}
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default App;
