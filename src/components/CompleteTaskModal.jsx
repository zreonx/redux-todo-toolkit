import { Modal } from "flowbite-react";
const CompleteTaskModal = ({
  completeTasks,
  setCompleteTasks,
  handleCompleteAllTask,
}) => {
  return (
    <Modal
      dismissible
      show={completeTasks}
      position='center'
      className='text-black max-sm:pt-2'
      onClose={() => setCompleteTasks(false)}
    >
      <div className='bg-lightcl dark:bg-slate-600 rounded-md'>
        <Modal.Header className='border-none pt-4 pb-0'>Notice</Modal.Header>
        <Modal.Body className='px-6 pt-2 pb-0'>
          <h3 className='dark:text-white mb-6'>
            Are you sure you want to mark all task as complete?
          </h3>
        </Modal.Body>
        <Modal.Footer className='border-none pt-0 mt-0 pb-4 flex items-center justify-end'>
          <button
            onClick={() => setCompleteTasks(false)}
            className='px-4 py-2 border dark:border-slate-50/50 hover:bg-lightcl dark:text-white rounded-lg dark:hover:bg-gray-500/50 dark:hover:text-white'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleCompleteAllTask();
              setCompleteTasks(false);
            }}
            className='px-4 py-2 border bg-green-400/80 dark:border-slate-50/50 hover:bg-lightcl dark:text-white rounded-lg dark:hover:bg-gray-500/50 dark:hover:text-white'
          >
            Confirm
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default CompleteTaskModal;
