import deleteIcon from "../assets/delete.png";

export default function IpTable({ records, onDelete, onSelect, loading }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 bg-fuchsia-400 text-white font-bold py-3 text-center text-sm">
        <div>IP</div>
        <div>PAÍS</div>
        <div>RIESGO</div>
        <div>ELIMINAR</div>
      </div>

      <div className="divide-y divide-orange-300">

        {loading && (
          <div className="grid grid-cols-4 bg-orange-100 py-4 text-sm">
            <div className="col-span-4 text-center text-gray-700">
              Cargando...
            </div>
          </div>
        )}

        {!loading && records.length === 0 && (
          <>
            <div className="grid grid-cols-4 bg-orange-100 py-4 text-sm">
              <div className="col-span-4 text-center text-gray-700">
                Sin datos
              </div>
            </div>

            {[1, 2].map((i) => (
              <div key={i} className="grid grid-cols-4 bg-orange-100 py-4">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ))}
          </>
        )}

        {!loading &&
          records.length > 0 &&
          records.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-4 bg-orange-100 py-3 text-xs md:text-sm cursor-pointer hover:bg-orange-50"
              onClick={() => onSelect(r)}
            >
              <div className="text-center font-semibold text-gray-800">
                {r.ip}
              </div>

              <div className="text-center text-gray-700">
                {r.country || "—"}
              </div>

              <div className="text-center text-gray-700">
                {r.threatLevel || "—"}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(r.id);
                  }}
                  className="p-0 bg-transparent border-none"
                >
                  <img
                    src={deleteIcon}
                    alt="Eliminar"
                    className="w-5 h-5 object-contain hover:opacity-80 transition"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
