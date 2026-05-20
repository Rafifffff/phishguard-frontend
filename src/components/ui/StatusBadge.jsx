const STATUS_STYLES = {
  "Dikirim":           "bg-blue-100   text-blue-700   border-blue-200",
  "Diproses":          "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Selesai Dianalisis":"bg-green-100  text-green-700  border-green-200",
  "Ditutup":           "bg-gray-100   text-gray-500   border-gray-200",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-500 border-gray-200";
  return (
    <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap [font-family:'Helvetica_Neue-Regular',Helvetica] ${style}`}>
      {status}
    </span>
  );
}