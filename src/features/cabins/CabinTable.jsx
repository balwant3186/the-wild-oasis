import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  const sortValue = searchParams.get("sortBy") || "startDate-asc";

  let filteredCabins = cabins ? [...cabins] : [];

  if (filterValue === "no-discount") {
    filteredCabins = cabins?.filter((cabin) => !cabin.discount);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  const [field, direction] = sortValue.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (sortValue === "name-asc") {
    filteredCabins?.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortValue === "name-desc") {
    filteredCabins?.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortValue === "startDate-asc") {
    filteredCabins?.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>

          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
