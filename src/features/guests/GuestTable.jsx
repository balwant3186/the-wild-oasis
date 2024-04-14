import Spinner from "../../ui/Spinner";
import { useGuests } from "./useGuests";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import GuestRow from "./GuestRow";
import Pagination from "../../ui/Pagination";

function GuestTable() {
  const { guests, isGuestsLoading, count } = useGuests();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  const sortValue = searchParams.get("sortBy") || "startDate-asc";

  let filteredGuests = guests ? [...guests] : [];

  if (filterValue === "no-discount") {
    filteredGuests = guests?.filter((cabin) => !cabin.discount);
  } else if (filterValue === "with-discount") {
    filteredGuests = guests?.filter((cabin) => cabin.discount > 0);
  }

  const [field, direction] = sortValue.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins = filteredGuests?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (sortValue === "name-asc") {
    filteredGuests?.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortValue === "name-desc") {
    filteredGuests?.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortValue === "startDate-asc") {
    filteredGuests?.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }

  if (!guests?.length) return <Empty resource="guests" />;

  if (isGuestsLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>

          <div>Full Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(guest) => <GuestRow guest={guest} key={guest.id} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
