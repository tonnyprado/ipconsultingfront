export default function IpInput({ value, onChange, onSubmit }) {
  function key(e) {
    if (e.key === "Enter") onSubmit();
  }

  return (
    <div className="border border-gray-700 bg-gray-200 rounded-md px-5 py-4">
      <input
        className="w-full bg-transparent text-center text-lg font-semibold outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={key}
        placeholder="ingresa tu IP aqui"
      />
    </div>
  );
}
