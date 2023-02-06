import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
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
                <Link href="/" className="flex flex-shrink-0 items-center">
                  <Image width="64" height="64" className="block h-12 w-auto lg:hidden" src="https://user-images.githubusercontent.com/19412160/216763313-d578238d-e21c-4e01-a403-f058245e84bb.png" alt="Web3Hook" />
                  <Image width="64" height="64" className="hidden h-12 w-auto lg:block" src="https://user-images.githubusercontent.com/19412160/216763313-d578238d-e21c-4e01-a403-f058245e84bb.png" alt="Web3Hook" />
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="https://docs.web3hook.com" target="_blank" rel="noreferrer" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 hover:border-orange-600 hover:text-gray-700">
                    Docs
                  </Link>
                  <Link href="https://zapier.com/developer/public-invite/175846/9abda33206f333dd54ce325ca1adfc64/" target="_blank" rel="noreferrer" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-lg font-medium text-gray-500 hover:border-orange-600 hover:text-gray-700">
                    Zapier
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                {session ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <Image width="64" height="64" className="h-8 w-8 rounded-full" src={session?.user?.image || "https://user-images.githubusercontent.com/19412160/216397505-8a5eb415-48d0-4c15-8ca5-9cc0f4cff4d5.png"} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/dashboard" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                              Dashboard
                            </Link>
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
                  <button className="text-lg" onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}>
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
              <Disclosure.Button as="a" href="https://docs.web3hook.com" target="_blank" rel="noreferrer" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                Docs
              </Disclosure.Button>
              <Disclosure.Button as="a" href="https://zapier.com/developer/public-invite/175846/9abda33206f333dd54ce325ca1adfc64/" target="_blank" rel="noreferrer" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                Zapier
              </Disclosure.Button>
            </div>
            {session ? (
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image width="64" height="64" className="h-10 w-10 rounded-full" src={session?.user?.image || "https://user-images.githubusercontent.com/19412160/216397505-8a5eb415-48d0-4c15-8ca5-9cc0f4cff4d5.png"} alt="" />
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button as="a" href="/dashboard" className="block px-4 py-2 text-base font-large text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                    Dashboard
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
