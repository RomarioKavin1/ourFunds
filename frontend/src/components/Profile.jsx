import { PiUserCircleThin } from "react-icons/pi";

const Profile = ({user}) => {
    return (
        <div className="flex items-center justify-end gap-x-12 ">           
            <p>{user}</p>
          <PiUserCircleThin size={48}/>
        </div>
    );
};
export default Profile;