import React from "react";

export interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showBorder?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  showBorder = true,
}: BrandLogoProps) {
  const dimensionClasses = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }[size];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-lg transition-all duration-200 overflow-hidden ${dimensionClasses} ${
        showBorder
          ? "border border-[#E8DEC8] dark:border-[#1E325C] bg-[#0A142F] group-hover:border-red-500 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.25)]"
          : "bg-[#0A142F]"
      } ${className}`}
      aria-label="Prashant Singh Brandmark"
      role="img"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hexagonal blueprint boundary */}
        <polygon
          points="50,4 88,26 88,74 50,96 12,74 12,26"
          stroke="#FAF7F2"
          strokeWidth="3.5"
          strokeOpacity="0.25"
          fill="#070D1E"
        />

        {/* Structural P stem and loop in Warm Ivory Cream */}
        <path
          d="M26 72V28H56C64.8366 28 72 35.1634 72 44C72 52.8366 64.8366 60 56 60H38"
          stroke="#FAF7F2"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ascending S trajectory in Royal Slate Blue */}
        <path
          d="M42 42C48 37 60 37 66 43C72 49 70 59 62 64L38 74C30 78 30 88 40 90C50 92 62 86 68 80"
          stroke="#3B82F6"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* 10% Crimson Red Precision Marker */}
        <polygon
          points="76,22 84,30 76,38 68,30"
          fill="#EF4444"
          className="group-hover:scale-110 transition-transform origin-center"
        />
      </svg>
    </span>
  );
}
