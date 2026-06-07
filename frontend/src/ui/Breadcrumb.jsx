import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [], title, description }) {
  return (
    <nav
      className="mb-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {item.to ? (
              <Link
                to={item.to}
                className="font-medium text-blue-600 transition hover:text-blue-700"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-stone-700">{item.label}</span>
            )}

            {index < items.length - 1 && (
              <svg
                className="w-3 h-3 text-stone-300"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.21a.75.75 0 010-1.06L10.88 9.5 7.21 6.35a.75.75 0 011.06-1.06l4 3.75a.75.75 0 010 1.06l-4 3.75a.75.75 0 01-1.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-4">
        {title && (
          <h1 className="text-3xl font-semibold text-stone-900">{title}</h1>
        )}
        {description && (
          <p className="mt-2 text-sm text-stone-500 max-w-2xl">{description}</p>
        )}
      </div>
    </nav>
  );
}
