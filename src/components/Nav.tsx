import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const { data: session } = useSession();
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <a href="/" className="flex flex-shrink-0 items-center">
                  <img className="block h-12 w-auto lg:hidden" src="https://user-images.githubusercontent.com/19412160/216683522-7ca6929d-7eed-4cd8-8952-cd097e9e5b7c.png" alt="Web3Hook" />
                  <img className="hidden h-12 w-auto lg:block" src="https://user-images.githubusercontent.com/19412160/216683522-7ca6929d-7eed-4cd8-8952-cd097e9e5b7c.png" alt="Web3Hook" />
                </a>
                {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/" className="inline-flex items-center border-b-2 border-orange-500 px-1 pt-1 text-sm font-medium text-gray-900">
                    Home
                  </a>
                  <a href="#" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                    Docs
                  </a>
                </div> */}
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                {session ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={session?.user?.image || "https://user-images.githubusercontent.com/19412160/216397505-8a5eb415-48d0-4c15-8ca5-9cc0f4cff4d5.png"} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a href="/admin" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                              Admin
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div onClick={() => signOut({ callbackUrl: "/" })} className={classNames(active ? "bg-gray-100" : "", "cursor-pointer block px-4 py-2 text-sm text-gray-700")}>
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button className="text-lg" onClick={() => signIn(undefined, { callbackUrl: "/admin" })}>
                    {session === null ? "Sign In" : ""}
                  </button>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* <Disclosure.Button as="a" href="#" className="block border-l-4 border-orange-500 bg-orange-50 py-2 pl-3 pr-4 text-base font-medium text-orange-700">
                Home
              </Disclosure.Button>
              <Disclosure.Button as="a" href="#" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                Docs
              </Disclosure.Button> */}
            </div>
            {session ? (
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={session?.user?.image || "https://user-images.githubusercontent.com/19412160/216397505-8a5eb415-48d0-4c15-8ca5-9cc0f4cff4d5.png"} alt="" />
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button as="a" href="/admin" className="block px-4 py-2 text-base font-large text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Admin
                  </Disclosure.Button>
                  <Disclosure.Button as="div" onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <Disclosure.Button as="div" onClick={() => signIn(undefined, { callbackUrl: "/" })} className="cursor-pointer block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                Sign In
              </Disclosure.Button>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
