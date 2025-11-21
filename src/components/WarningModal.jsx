export default function WarningModal({ open, onClose, ip }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
        <h2 className="text-xl font-bold mb-3">IP ya registrada</h2>
        <p className="mb-4">
          La IP <span className="font-semibold">{ip}</span> ya ESTA almacenada.
        </p>

        <button
          className="w-full py-2 bg-blue-600 text-white rounded-md"
          onClick={onClose}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
