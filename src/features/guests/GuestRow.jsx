import styled from "styled-components";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useDeleteGuest } from "./useDeleteGuest";
import CreateGuestForm from "./CreateGuestForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Guest = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const GuestRow = ({ guest }) => {
  const { id: guestId, countryFlag, fullName, email, nationality } = guest;

  const { isDeletingGuest, deleteGuest } = useDeleteGuest();

  return (
    <Table.Row role="row">
      <Img src={countryFlag} alt={fullName} />
      <Guest>{fullName}</Guest>
      <div>{email}</div>
      <div>{nationality}</div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={guestId} />
            <Menus.List id={guestId}>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-guest">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit">
            <CreateGuestForm guestToEdit={guest} />
          </Modal.Window>

          <Modal.Window name="delete-guest">
            <ConfirmDelete
              onConfirm={() => deleteGuest(guestId)}
              resourceName={`Guest ${fullName}`}
              disabled={isDeletingGuest}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};
export default GuestRow;
