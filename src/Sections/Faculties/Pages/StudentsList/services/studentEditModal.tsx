import Modal from "../Modal/Modal";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  item?: StudentColumnData;
};

const StudentEditModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Edit Store"}
      type={"success"}
      onDone={() => console.log("done")}
    >
      <h1>Edit Store</h1>
      <p>{props.item?.name}</p>
      <p>{props.item?.address}</p>
    </Modal>
  );
};

export default StudentEditModal;
