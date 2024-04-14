import AddGuest from "../features/guests/AddGuest";
import GuestTable from "../features/guests/GuestTable";
import Heading from "../ui/Heading";

function Guests() {
  return (
    <>
      <Heading as="h1">All Guests</Heading>

      <GuestTable />

      <AddGuest />
    </>
  );
}

export default Guests;
