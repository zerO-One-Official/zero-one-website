import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";

// Define the variants using cva
const logoStyles = cva("flex items-stretch gap-4", {
  variants: {
    size: {
      icon: "w-12 h-auto", // Only logo image shown
      small: "w-10 h-auto", // Small size
      default: "flex justify-end translate-y-[1.5px]", // Default size
      large: "flex-col justify-end translate-y-[1.5px] text-5xl", // Large size
    },
  },
  defaultVariants: {
    size: "default", // Default variant
  },
});

const Logo = ({ size = "default" }) => {
  return (
    <Link href="/" className={logoStyles({ size: size })}>
      <Image
        src="/logo.png"
        quality={100}
        width={80} // Set appropriate width
        height={80} // Set appropriate height
        className="h-auto lg:w-10"
        alt="zero-one logo"
        priority
      />
      {size !== "icon" && ( // Only show text if not in icon mode
        <div className="flex flex-col justify-end translate-y-[1.5px]">
          <h1 className="font-semibold text-4xl xs:text-3xl lg:text-[40px] lg:leading-9 xs:leading-8">
            ZERO ONE
          </h1>
          <p className="font-normal text-sm text-stone-400 leading-4 xs:leading-0 lg:text-xs">
            Create. Code. Conquer.
          </p>
        </div>
      )}
    </Link>
  );
};

export default Logo;
