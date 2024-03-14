import { FaMapSigns } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import "../App.css";
import Guests from "./Guests";
import { useEffect, useState } from "react";
import axios from "axios";

interface Guest {
  _id: string;
  name: string;
  participate: boolean;
}

interface Props {
  title: string;
  text?: string;
  subText?: string;
  buttonText: string;
  href?: string;
  srcImg?: string;
  icon?: string;
  isOpen: boolean;
}

const CardGuests = ({
  title,
  text,
  subText,
  buttonText,
  href,
  srcImg,
  icon,
  isOpen,
}: Props) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [participateTrueCount, setParticipateTrueCount] = useState<number>(0);
  const [participateFalseCount, setParticipateFalseCount] = useState<number>(0);
  const [toConfirmCount, setToConfirmCount] = useState<number>(0);

  const handleUpdate = () => {
    axios
      .get<Guest[]>("https://graduation-invitation-backend.onrender.com/")
      .then((response) => setGuests(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get<Guest[]>("https://graduation-invitation-backend.onrender.com/")
      .then((response) => setGuests(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const countParticipate = () => {
      const participateTrue = guests.filter(
        (guest) => guest.participate
      ).length;
      setParticipateTrueCount(participateTrue);

      const participateFalse = guests.filter(
        (guest) => guest.participate === false
      ).length;
      setParticipateFalseCount(participateFalse);

      const toConfirm = guests.filter(
        (guest) => guest.participate === null
      ).length;
      setToConfirmCount(toConfirm);
    };

    countParticipate();
  }, [guests]);

  return (
    <div className="card mb-3 text-start" style={{ width: "300px" }}>
      {isOpen && srcImg && <img src={srcImg} className="card-img-top" />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {isOpen && (
          <>
            <p className="card-text">{text}</p>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {subText}
            </h6>
            <a
              href={href}
              target="_blank"
              className="btn"
              style={{ color: "white", backgroundColor: "#872929" }}
            >
              {icon == "FaMapSigns" && <FaMapSigns className="me-2" />}
              {icon == "IoMdPersonAdd" && (
                <IoMdPersonAdd className={`${buttonText ? "me-2" : ""}`} />
              )}
              {buttonText}
            </a>
            <div className="list-group-item d-flex justify-content-start align-items-center mt-2">
              <div
                className={`letter-container badge text-bg-primary text-wrap p-2`}
              >
                🥳 Presenti: {participateTrueCount}
              </div>
              <div
                className={`letter-container badge text-bg-danger text-wrap p-2 mx-2`}
              >
                🥲 Assenti: {participateFalseCount}
              </div>
            </div>
            <div
              className={`letter-container badge text-bg-warning text-wrap p-2 mt-2`}
            >
              ✍🏻 Da confermare: {toConfirmCount}
            </div>
            <Guests guests={guests} handleUpdate={handleUpdate} />
          </>
        )}
      </div>
    </div>
  );
};

export default CardGuests;
