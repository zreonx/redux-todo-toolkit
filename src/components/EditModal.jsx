import { Modal } from "flowbite-react";
import { useFocus } from "../hooks/useFocus";

const EditModal = ({
  setEditTodo,
  editTodo,
  handleSaveTodo,
  openModal,
  setOpenModal,
}) => {
  const inputRef = useFocus();

  return (
    <Modal
      show={openModal}
      position='center'
      className='text-black max-sm:pt-2'
      onClose={() => setOpenModal(false)}
      closable={false}
      initialFocus={inputRef}
    >
      <div className='bg-lightcl dark:bg-slate-600 rounded-md'>
        <Modal.Header className='border-none pt-4 pb-0'>Todo</Modal.Header>
        <Modal.Body className='px-6 pt-2 pb-0'>
          <textarea
            className='w-full px-1 font-medium text-lg py-1 focus:outline-none focus:border-slate-300 border-none resize-none border-slate-300 border-b-slate-300 bg-transparent dark:!text-white h-[10rem]'
            value={editTodo.task}
            ref={inputRef}
            onChange={(e) => {
              setEditTodo({ ...editTodo, task: e.target.value });
            }}
            // onKeyUp={(e) => {
            //   if (e.key === "Enter") {
            //     handleSaveTodo();
            //     e.target.blur();
            //     setOpenModal(false);
            //   }
            // }}
          />
          <div className='pt-2 italic font-extralight text-xs dark:text-gray-50/50'>
            <span>{editTodo.isEdited ? "Edited: " : ""}</span>
            {editTodo.dateCreated}
          </div>
        </Modal.Body>
        <Modal.Footer className='border-none pt-0 mt-0 pb-4 flex items-center justify-end'>
          <button
            onClick={() => handleSaveTodo()}
            className='px-4 py-2 border dark:border-slate-50/50 hover:bg-lightcl dark:text-white rounded-lg dark:hover:bg-gray-500/50 dark:hover:text-white'
          >
            Save
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditModal;
