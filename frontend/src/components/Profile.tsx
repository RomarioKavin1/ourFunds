import KintoW from "../app/assets/kintoW.svg";

const Profile = ({user}) => {
    return (
        <div className="flex items-center w-auto justify-end mb-12">           
          <div className="flex gap-x-6 items-center w-auto text-fourth bg-[white]/[0.04] border border-[white]/[0.06] transition
        hover:bg-[white]/[0.2] py-3 px-6 rounded-full"> 
            <img src={KintoW.src} alt="" style={{ width: '22px', height: '22px' }}/>
            <p>{user}</p>
          </div>
        </div>
    );
};
export default Profile;