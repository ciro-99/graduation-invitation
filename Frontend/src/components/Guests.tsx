import axios from "axios";
import { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";

interface Guest {
  _id: string;
  name: string;
  participate: boolean;
}

interface Props {
  guests: Guest[];
  handleUpdate: () => void;
}

const Guests = ({ guests, handleUpdate }: Props) => {
  const [invitati, setInvitati] = useState<Guest[]>(guests);

  const togglePartecipa = async (id: string, participate: boolean) => {
    try {
      const response = await axios.put(
        `https://graduation-invitation-backend.onrender.com/update/${id}`,
        {
          participate,
        }
      );
      const updatedInvitati = response.data;
      setInvitati(updatedInvitati);
      handleUpdate();
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  };

  // useEffect(() => {
  //   axios
  //     .get<Guest[]>("http://localhost:9000/")
  //     .then((response) => setInvitati(response.data))
  //     .catch((error) => console.error(error));
  // }, []);

  // const sortedInvitati = [...invitati].sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );

  return (
    <div>
      <ul className="list-group mt-3">
        <div
          style={{ fontSize: "12px" }}
          className="list-group-item d-flex justify-content-center align-items-center"
        >
          <IoMdPersonAdd className={"me-2"} />
          <strong>Conferma la tua presenza!</strong>
        </div>
        {invitati.map((invitato, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ fontSize: "15px" }}
          >
            {invitato.name}
            <div className="ms-2 d-flex justify-content-md-end">
              <button
                className={`btn me-2 me-md-2 ${
                  invitato.participate === true
                    ? "btn-success"
                    : "btn-outline-success"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  togglePartecipa(invitato._id, true);
                }}
              >
                👍🏼
              </button>
              <button
                className={`btn ${
                  invitato.participate === false
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                onClick={(event) => {
                  event.stopPropagation();
                  togglePartecipa(invitato._id, false);
                }}
              >
                👎🏼
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Guests;
