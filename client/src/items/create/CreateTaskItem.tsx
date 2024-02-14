import ItemForm from './ItemForm';

interface CreateItemProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateItem: React.FC<CreateItemProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? '' : 'hidden'}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <button className="absolute top-0 right-0 m-4" onClick={onClose}>
              Close
            </button>
            <h1 className="text-lg font-semibold mb-4">Create Issue</h1>
          </div>

          <ItemForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
