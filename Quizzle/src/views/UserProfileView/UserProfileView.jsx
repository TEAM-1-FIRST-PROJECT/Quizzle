import UserProfile from "../../components/UserProfile/UserProfile";
import UserResultsTable from "../../components/UserResultTable/UserResultsTable";

const UserProfileView = () => {
  return (
    <>
      <div className="h-screen">
        <UserProfile></UserProfile>
        <UserResultsTable></UserResultsTable>
      </div>
    </>
  );
};

export default UserProfileView;
