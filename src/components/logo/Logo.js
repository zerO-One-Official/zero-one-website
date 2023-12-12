import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="flex items-stretch xs:gap-2 gap-4">
      <Image src={'/logo.png'} quality={100} width={80} height={80} className="w-12 h-auto lg:w-10" alt="zero-one logo" priority />
      <div className="flex flex-col justify-end  translate-y-[1.5px]">
        <h1 className="font-bold text-5xl xs:text-4xl lg:text-[40px] lg:leading-9 xs:leading-8">ZERO ONE</h1>
        <p className="font-normal text-sm text-stone-400 leading-4 xs:leading-0 lg:text-xs">Create. Code. Conquer.</p>
      </div>
    </Link>
  )
}
export default Logo