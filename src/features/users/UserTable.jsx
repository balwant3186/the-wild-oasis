import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import UserRow from "./UserRow";
import { useUsers } from "./useUsers";
import Spinner from "../../ui/Spinner";

function UserTable() {
  //   const { users, isLoading } = useUsers();
  //   console.log("🚀 ~ UserTable ~ users:", users);

  //   if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table>
        <Table.Header>
          <div></div>
          <div>Full Name</div>

          <div>Email</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={[]}
          render={(user) => <UserRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UserTable;
