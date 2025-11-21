export default function DetailsModal({ record, onClose }) {
  if (!record) return null;

  const fields = Object.entries(record);

  function exportRecord() {
    const blob = new Blob([JSON.stringify(record, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ip-${record.ip || "detalle"}.json`;
    link.click();
  }

  function abrirMapa() {
    if (!record.latitude || !record.longitude) {
      alert("Esta IP no contiene información de ubicación.");
      return;
    }

    const url = `https://www.google.com/maps?q=${record.latitude},${record.longitude}`;
    window.open(url, "_blank");
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl max-w-md max-h-[80vh] w-full overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detalles de IP</h2>
          <button onClick={onClose} className="text-2xl leading-none">
            ×
          </button>
        </div>

        <ul className="text-sm space-y-1 mb-4">
          {fields.map(([k, v]) => (
            <li key={k} className="flex justify-between">
              <b className="mr-3">{k}</b>
              <span className="text-right flex-1">{String(v)}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={exportRecord}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold"
          >
            Exportar datos de esta IP
          </button>

          <button
            onClick={abrirMapa}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
          >
            Ver ubicación en el mapa
          </button>
        </div>
      </div>
    </div>
  );
}
