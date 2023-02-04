import Image from "next/image";

export default function Event() {
  return (
    <>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className="px-6 lg:px-0 lg:pt-4 lg:pr-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900">Listen to Events</h1>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9 text-2xl">
                    <dt className="inline font-semibold text-gray-900">
                      <svg className="absolute top-1 left-1 h-5 w-5 text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" clipRule="evenodd" />
                      </svg>
                    </dt>
                    <dd className="inline">Select your blockchain, address and ABI</dd>
                  </div>

                  <div className="relative pl-9 text-2xl">
                    <dt className="inline font-semibold text-gray-900">
                      <svg className="absolute top-1 left-1 h-5 w-5 text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" clipRule="evenodd" />
                      </svg>
                    </dt>
                    <dd className="inline">Listen to any events emmited from that contract.</dd>
                  </div>

                  <div className="relative pl-9 text-2xl">
                    <dt className="inline font-semibold text-gray-900">
                      <svg className="absolute top-1 left-1 h-5 w-5 text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                      </svg>
                    </dt>
                    <dd className="inline">Trigger any web2 action.</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="relative isolate overflow-hidden bg-orange-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pt-16 sm:pl-16 sm:pr-0 lg:mx-0 lg:max-w-none">
                <div className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-orange-100 opacity-20 ring-1 ring-inset ring-white" aria-hidden="true"></div>
                <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                  <Image src="https://user-images.githubusercontent.com/19412160/216685782-5bdba911-7300-4a1e-b5e3-eccf1dcabf06.png" alt="Product screenshot" width="2432" height="1442" className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10" />
                </div>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
