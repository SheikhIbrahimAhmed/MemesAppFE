import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Upload Meme', href: '/post-meme', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate()


    return (
        <Disclosure as="nav" className="bg-black border-b border-lightBeige">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    {/* Logo and navigation */}
                    <div className="flex flex-1 ml-16 sm:items-stretch sm:justify-start shrink-0">
                        <div className="flex shrink-0 items-center"></div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => {
                                    const isCurrent = location.pathname === item.href; // Dynamically check if the route matches
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={isCurrent ? 'page' : undefined}
                                            className={classNames(
                                                isCurrent
                                                    ? 'text-lightBeige border border-lightBeige hover:text-softWhite'
                                                    : 'text-lightBeige  hover:text-softWhite',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Search bar and profile menu */}
                    <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Search Bar */}
                        <div className="relative">
                            {/* <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            /> */}
                        </div>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "bg-black60 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );

}
