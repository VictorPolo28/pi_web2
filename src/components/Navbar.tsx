import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Money Manager</h1>
      <ul className="flex gap-6">
        <li>
          <Link href="/dashboard" className="hover:text-gray-200 transition">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/categories" className="hover:text-gray-200 transition">
            Categorías
          </Link>
        </li>
        <li>
          <Link href="/dashboard/expense" className="hover:text-gray-200 transition">
            Gastos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
