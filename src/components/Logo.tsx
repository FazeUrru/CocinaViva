export function Logo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" /> {/* orange-600 */}
          <stop offset="100%" stopColor="#DC2626" /> {/* red-600 */}
        </linearGradient>
      </defs>

      {/* Sleek, professional background */}
      <rect width="100" height="100" rx="24" fill="#111827" /> {/* gray-900 */}

      {/* Abstract elegant culinary symbol (Flame + Cloche/Leaf) */}
      <path
        d="M50 20 C50 20 30 40 30 60 C30 71.0457 38.9543 80 50 80 C61.0457 80 70 71.0457 70 60 C70 40 50 20 50 20 Z"
        stroke="url(#logoGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 45 C50 45 40 55 40 65 C40 70.5228 44.4772 75 50 75 C55.5228 75 60 70.5228 60 65 C60 55 50 45 50 45 Z"
        fill="url(#logoGradient)"
      />

      {/* Minimalist Fork Tines */}
      <path
        d="M45 40 L45 25 M55 40 L55 25 M50 35 L50 20"
        stroke="#F9FAFB"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo size={36} />
      <div className="flex flex-col">
        <span className="text-lg font-black tracking-tight text-gray-900 leading-none">
          CocinaViva<span className="text-orange-600">.com</span>
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[8px] font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 px-1.5 py-0.5 rounded-full uppercase">
            v2.0.0 ESTABLE
          </span>
          <span className="text-[7px] font-bold text-white bg-gray-800 px-1 py-0.5 rounded uppercase">
            OPEN SOURCE
          </span>
        </div>
      </div>
    </div>
  );
}
