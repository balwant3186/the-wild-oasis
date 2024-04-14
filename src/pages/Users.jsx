import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import UserTable from "../features/users/UserTable";

function NewUsers() {
  return (
    <>
      <Heading as="h1">All Users</Heading>

      {/* <UserTable /> */}

      <SignupForm />
    </>
  );
}

export default NewUsers;
