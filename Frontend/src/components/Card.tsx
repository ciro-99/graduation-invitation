import { FaMapSigns } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import "../App.css";

interface Props {
  title: string;
  text?: string;
  subText?: string;
  buttonText: string;
  href: string;
  srcImg?: string;
  icon?: string;
  isOpen: boolean;
}

const Card = ({
  title,
  text,
  subText,
  buttonText,
  href,
  srcImg,
  icon,
  isOpen,
}: Props) => {
  return (
    <div className="card mb-3 text-start" style={{ width: "350px" }}>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
