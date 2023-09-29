import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/" className="flex items-stretch xs:gap-2 gap-4">
      <Image src={'/logo.png'} quality={100} width={80} height={80} className="w-16 h-auto lg:w-10 xs:w-8" alt="zero-one logo" />
      <div className="flex flex-col justify-end">
        <h1 className="font-semibold text-5xl xs:text-2xl lg:text-4xl">ZERO ONE</h1>
        <p className="font-normal text-zinc-400 leading-4 xs:leading-3 xs:text-sm">Create. Code. Conquer.</p>
      </div>
    </Link>
  )
}
export default Logo