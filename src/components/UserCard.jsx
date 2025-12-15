import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  // ✅ guard: if user is not ready yet
  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status) => {
    if (!_id) {
      console.error("User _id is missing:", user);
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error("Send request failed:", err?.response?.status, err?.response?.data || err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        {age && gender && <p>{age}, {gender}</p>}
        <p>{about}</p>

        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",_id)}>
          </button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested",_id)}>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
