import Image from "next/image";
import Link from "next/link";

export default function Chains() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">Across Multiple Chains</h1>
        <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://mantle.xyz/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/mantle.png" alt="mantle" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://ethereum.org/en/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/ethereum.png" alt="ethereum" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://polygon.technology/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/polygon.png" alt="polygon" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/bsc.png" alt="binance smart chain" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://avax.network/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/avalanche.png" alt="avalanche" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://fantom.foundation/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/fantom.png" alt="fantom" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://arbitrum.io/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/arbitrium.png" alt="arbitrium" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://cronos.org/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/cronos.png" alt="cronos" />
            </Link>
          </div>
          <div className="col-span-1 flex justify-center py-8 px-8">
            <Link href="https://palm.io/" target="_blank" rel="noreferrer">
              <Image width="96" height="96" src="/images/chains/palm.png" alt="palm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
