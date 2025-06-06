import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#ebfa9e] text-secondary px-6 w-[98%] m-auto md:px-16 py-12 rounded-t-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Kiri */}
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Xavier Botton<span className="align-super text-xs">®</span>
          </h1>
          <ul className="space-y-2 text-sm ">
            <li>
              <Link href="#" className="hover:text-white transition">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Legal notice
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Kanan */}
        <div className="flex gap-4">
          <Link
            href="#"
            className="border border-white rounded-full px-6 py-3 text-sm hover:bg-white hover:text-black transition"
          >
            Join the team ↘
          </Link>
          <Link
            href="#"
            className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-200 transition"
          >
            Contact us ↘
          </Link>
        </div>
      </div>
    </footer>
  );
}
