export default function SectionHeader({ title, subtitle, badge }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>
      </div>
      {badge && <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">{badge}</div>}
    </div>
  );
}
