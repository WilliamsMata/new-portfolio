import { memo, type FC, type SVGProps } from "react";

export const WMIcon: FC<SVGProps<SVGSVGElement>> = memo(function WMIcon({
  ...props
}) {
  return (
    <svg
      width="636"
      height="484"
      viewBox="0 0 636 484"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M616 410L523.124 109.234C511.774 72.4755 460.613 70.18 446.016 105.774L358.414 319.383C344.611 353.041 297.068 353.387 282.777 319.933L190.237 103.309C175.214 68.1409 124.48 70.8721 113.319 107.45L21 410"
        stroke="url(#paint0_linear_1_9)"
        strokeWidth="39"
        strokeLinecap="round"
      />
      <path
        d="M20 74L112.875 374.766C124.226 411.524 175.387 413.82 189.984 378.226L277.586 164.617C291.389 130.959 338.932 130.613 353.223 164.067L445.763 380.691C460.786 415.859 511.52 413.128 522.681 376.55L615 74"
        strokeOpacity="0.980392"
        strokeWidth="39"
        strokeLinecap="round"
        className="stroke-foreground"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_9"
          x1="-4.50004"
          y1="243.5"
          x2="641.5"
          y2="247.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.114583" stopColor="#FFE713" />
          <stop offset="0.885417" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
});
