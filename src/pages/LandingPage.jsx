import { useEffect, useState } from "react";
import { lookupIp, getLogs, deleteLog, clearLogs } from "../api/ipApi";
import IpInput from "../components/IpInput";
import IpTable from "../components/IpTable";
import FiltersModal from "../components/FiltersModal";
import DetailsModal from "../components/DetailsModal";
import WarningModal from "../components/WarningModal";

export default function LandingPage() {
  const [ip, setIp] = useState("");
  const [logs, setLogs] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningIp, setWarningIp] = useState("");

  useEffect(() => {
    cargarLogs();
  }, []);

  function aplicarFiltros(registros, filtros) {
    const {
      ip = "",
      country = "",
      city = "",
      region = "",
      type = "",
      threatLevel = "",
      timeZone = "",
    } = filtros || {};

    const norm = (v) => (v || "").toString().toLowerCase();

    return registros.filter((r) => {
      if (ip && !norm(r.ip).includes(ip.toLowerCase())) return false;
      if (country && !norm(r.country).includes(country.toLowerCase()))
        return false;
      if (city && !norm(r.city).includes(city.toLowerCase())) return false;
      if (region && !norm(r.region).includes(region.toLowerCase()))
        return false;
      if (type && !norm(r.type).includes(type.toLowerCase())) return false;
      if (
        threatLevel &&
        !norm(r.threatLevel).includes(threatLevel.toLowerCase())
      )
        return false;
      if (timeZone && !norm(r.timeZone).includes(timeZone.toLowerCase()))
        return false;

      return true;
    });
  }

  function cargarLogs(f = filters) {
    setLoading(true);
    setError("");
    getLogs()
      .then((data) => {
        const lista = data || [];
        setAllLogs(lista);
        setLogs(aplicarFiltros(lista, f));
      })
      .catch((e) => setError(e.message || "Load failed"))
      .finally(() => setLoading(false));
  }

  function handleLookup() {
    if (!ip) return;
    setLoading(true);
    setError("");
    lookupIp(ip)
      .then((record) => {
        const yaExiste = allLogs.some((log) => log.ip === record.ip);
        if (yaExiste) {
          setWarningIp(record.ip);
          setWarningOpen(true);
          return;
        }
        setAllLogs((prev) => {
          const nuevaLista = [record, ...prev];
          setLogs(aplicarFiltros(nuevaLista, filters));
          return nuevaLista;
        });
      })
      .catch((e) => setError(e.message || "Lookup failed"))
      .finally(() => setLoading(false));
    setIp("");
  }

  function handleDelete(id) {
    deleteLog(id).then(() => {
      setAllLogs((prev) => {
        const nuevaLista = prev.filter((x) => x.id !== id);
        setLogs(aplicarFiltros(nuevaLista, filters));
        return nuevaLista;
      });
    });
  }

  function handleReset() {
    if (!window.confirm("¿Reiniciar tabla completa?")) return;
    clearLogs().then(() => {
      setAllLogs([]);
      setLogs([]);
      setFilters({});
    });
  }

  return (
    <div className="w-full max-w-5xl px-8">
      <h1 className="text-center text-4xl font-extrabold text-white tracking-[0.25em] mb-10">
        CONSULTA DE IP
      </h1>

      <IpInput value={ip} onChange={setIp} onSubmit={handleLookup} />

      {error && (
        <p className="text-center text-red-600 text-sm mt-2">{error}</p>
      )}

      <div className="flex justify-start my-8">
        <button
          onClick={() => setShowFilters(true)}
          className="bg-sky-400 hover:bg-sky-500 text-white font-semibold tracking-wide px-10 py-3 rounded-lg shadow-md transition-transform hover:-translate-y-0.5"
        >
          FILTROS
        </button>
      </div>

      <div className="bg-orange-200 rounded-xl shadow-inner overflow-hidden mb-6">
        <IpTable
          records={logs}
          loading={loading}
          onSelect={setSelected}
          onDelete={handleDelete}
        />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg tracking-wide"
        >
          REINICIAR TABLA
        </button>
      </div>

      {showFilters && (
        <FiltersModal
          initial={filters}
          onClose={() => setShowFilters(false)}
          onApply={(f) => {
            setFilters(f);
            setLogs(aplicarFiltros(allLogs, f));
            setShowFilters(false);
          }}
        />
      )}

      {selected && (
        <DetailsModal record={selected} onClose={() => setSelected(null)} />
      )}

      <WarningModal
        open={warningOpen}
        ip={warningIp}
        onClose={() => setWarningOpen(false)}
      />
    </div>
  );
}
