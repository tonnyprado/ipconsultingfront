import { useState } from "react";

export default function FiltersModal({ initial, onClose, onApply }) {
  const [ip, setIp] = useState(initial.ip || "");
  const [country, setCountry] = useState(initial.country || "");
  const [city, setCity] = useState(initial.city || "");
  const [region, setRegion] = useState(initial.region || "");
  const [type, setType] = useState(initial.type || "");
  const [threatLevel, setThreat] = useState(initial.threatLevel || "");
  const [timeZone, setTimeZone] = useState(initial.timeZone || "");

  function apply() {
    onApply({ ip, country, city, region, type, threatLevel, timeZone });
  }

  function clearAll() {
    setIp("");
    setCountry("");
    setCity("");
    setRegion("");
    setType("");
    setThreat("");
    setTimeZone("");
    onApply({
      ip: "",
      country: "",
      city: "",
      region: "",
      type: "",
      threatLevel: "",
      timeZone: "",
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Filtros</h2>
          <button onClick={onClose} className="text-xl leading-none">
            ×
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <input
            className="border px-3 py-2 w-full rounded"
            placeholder="IP"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <input
            className="border px-3 py-2 w-full rounded"
            placeholder="País (country)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="border px-3 py-2 w-full rounded"
            placeholder="Ciudad (city)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="border px-3 py-2 w-full rounded"
            placeholder="Región (region)"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <input
            className="border px-3 py-2 w-full rounded"
            placeholder="Tipo (IPv4 / IPv6)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            className="border px-3 py-2 w-full rounded"
            placeholder="Nivel de amenaza"
            value={threatLevel}
            onChange={(e) => setThreat(e.target.value)}
          />
          <input
            className="border px-3 py-2 w-full rounded"
            placeholder="Zona horaria"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          />
        </div>

        <div className="flex justify-between pt-2 text-sm">
          <button onClick={clearAll} className="text-gray-600">
            Limpiar
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={apply}
              className="px-4 py-2 rounded bg-sky-500 text-white font-semibold"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
