import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <main>
        <div className="relative isolate overflow-hidden bg-white">
          <svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="0787a7c5-978c-4f66-83c7-11c213f99cb7" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
          </svg>
          <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
              <Image width="120" height="120" src="/images/logo.png" alt="Web3Hook" />
              <h1 className="mt-10 text-6xl font-bold tracking-tight text-gray-900 sm:text-6xl">No Code Web3 Automation</h1>
              <p className="mt-6 text-2xl leading-8 text-gray-600">Integrate nicely with Zapier. Design powerful workflows between web3 and web2 applications without relying on developer resources.</p>
              <div className="mt-10 flex items-center gap-x-6">
                <button onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })} className="w-60 text-center text-xl items-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  Sign Up
                </button>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image src="/images/transaction.png" alt="App screenshot" width="2432" height="1442" className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
