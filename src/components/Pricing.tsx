import { signIn } from "next-auth/react";

export default function Pricing() {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 px-6 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">Pricing</h1>
            <p className="mt-6 text-2xl leading-8 text-gray-600 sm:text-center">Start building for free. If you like it, pay as you go.</p>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-2">

            <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h2 className="text-3xl font-medium leading-6 text-gray-900">Hobby</h2>
                <p className="mt-4 text-l text-gray-500">All the basics for tinkering.</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">$0</span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
                <button onClick={() => signIn(undefined, { callbackUrl: "/admin" })} className="mt-8 block w-60 rounded-md border border-orange-600 bg-orange-600 py-2 text-center text-xl  text-white hover:bg-orange-700">
                  Sign Up
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-l font-medium text-gray-900">What&apos;s included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">Multichain</span>
                  </li>

                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">1,000 credits</span>
                  </li>

                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">Listen to Transactions</span>
                  </li>

                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">Listen to Events.</span>
                  </li>

                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">Call View Function</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h2 className="text-3xl font-medium leading-6 text-gray-900">Enterprise</h2>
                <p className="mt-4 text-l text-gray-500">The real deal</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">$🤷</span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
                <button disabled onClick={() => signIn(undefined, { callbackUrl: "/admin" })} className="mt-8 block w-60 rounded-md border border-orange-300 bg-orange-300 py-2 text-center text-xl  text-white hover:bg-orange-300">
                  Coming Soon
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-l font-medium text-gray-900">What&apos;s included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">Same as Hobby</span>
                  </li>

                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">100,000 credits</span>
                  </li>

                  <li className="flex space-x-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className="text-l text-gray-500">Additonal credits cost $--</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
