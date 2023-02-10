import Image from "next/image";

export default function Chains() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:py-16 lg:px-8">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">Across Multiple Chains</h1>
        <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/mantle.png" alt="mantle" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/ethereum.png" alt="ethereum" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/polygon.png" alt="polygon" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/bsc.png" alt="binance smart chain" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/avalanche.png" alt="avalanche" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/fantom.png" alt="fantom" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/arbitrium.png" alt="arbitrium" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/cronos.png" alt="cronos" />
          </div>
          <div className="col-span-1 flex justify-center bg-gray-50 py-8 px-8">
            <Image width="96" height="96" src="/images/chains/palm.png" alt="palm" />
          </div>
        </div>
      </div>
    </div>
  );
}
