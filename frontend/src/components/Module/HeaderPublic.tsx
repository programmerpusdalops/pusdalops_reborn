import { Fragment, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownNotification from '../DropdownNotification';

import { NavLink } from 'react-router-dom';

// Asset Import
import logoSulteng from '../../assets/images/logo/sulteng.png';
import logoBPBD from '../../assets/images/logo/bpbd.png';

export default function HeaderPublic() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="inset-x-0 top-0 z-50 bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        {/* versi desktop */}
        <nav
          className="flex items-center justify-between p-6 lg:px-8 lg:py-3"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 gap-x-3 items-center">
            <a href="#" className="-m-1.5 p-1.5 flex gap-3">
              <img className="h-8 w-auto" src={logoSulteng} />
              <img className="h-8 w-auto" src={logoBPBD} />
            </a>
            <label className="font-bold hidden lg:inline-block">
              BPBD PROVINSI SULAWESI TENGAH
            </label>
            <label className="font-bold text-sm md:hidden">
              BPBD PROV SULTENG
            </label>

            <div className="flex items-center gap-2 2xsm:gap-4">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                {/* <!-- Dark Mode Toggler --> */}
                <DarkModeSwitcher />
                {/* <!-- Dark Mode Toggler --> */}

                {/* <!-- Notification Menu Area --> */}
                <DropdownNotification />
                {/* <!-- Notification Menu Area --> */}
              </ul>
            </div>
          </div>

          <div className="flex lg:hidden ml-2">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:gap-x-7 lg:justify-end">
            <NavLink
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Beranda
            </NavLink>
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Master Data
                  {/* <ChevronDownIcon
                    className="h-4 w-4 flex-none text-gray-400"
                    aria-hidden="true"
                  /> */}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-50 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/data-bencana-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Data Bencana
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/data-logpal-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Data Logpal
                        </NavLink>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            {/* <NavLink
              to="/dokumen-publik"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Dokumen
            </NavLink> */}

            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Informasi
                  {/* <ChevronDownIcon
                    className="h-4 w-4 flex-none text-gray-400"
                    aria-hidden="true"
                  /> */}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-50 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/dokumen-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Dokumen
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/pengetahuan-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Pengetahuan Bencana 
                          {/* <ChevronDownIcon
                            className="h-4 w-4 flex-none text-gray-400"
                            aria-hidden="true"
                          /> */}
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/tips-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Tips Bencana
                        </NavLink>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Publikasi
                  {/* <ChevronDownIcon
                    className="h-4 w-4 flex-none text-gray-400"
                    aria-hidden="true"
                  /> */}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-50 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/berita-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Berita
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/majalah-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Majalah
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/infografis-publik"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Infografis Bencana
                        </NavLink>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Kontak
                  {/* <ChevronDownIcon
                    className="h-4 w-4 flex-none text-gray-400"
                    aria-hidden="true"
                  /> */}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-50 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/kontak-kami"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Hubungi Kami
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="/kontak-penting"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Kontak Penting
                        </NavLink>
                      </div>          
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Aplikasi
                  {/* <ChevronDownIcon
                    className="h-4 w-4 flex-none text-gray-400"
                    aria-hidden="true"
                  /> */}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-40 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="https://dashboard.gis.pusdalops-bpbdsulteng.com/login.php"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Web GIS
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="https://dashboard.core.pusdalops-bpbdsulteng.com/deskrelawan"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Deskrelawan
                        </NavLink>
                      </div> 
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="https://dashboard.core.pusdalops-bpbdsulteng.com/jitupasna_log"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          E-Jitupasna
                        </NavLink>
                      </div>         
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  Lapor
                  {/* <ChevronDownIcon
                    className="h-4 w-4 flex-none text-gray-400"
                    aria-hidden="true"
                  /> */}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-40 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="#"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Lapor Bencana
                        </NavLink>
                      </div>
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                        <NavLink
                          to="https://wa.me/628114032247" target='_BLANK'
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Lapor Via Wa
                        </NavLink>
                      </div>     
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>

            <NavLink
              to="/Auth/SignIn"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sign In <span aria-hidden="true">&rarr;</span>
            </NavLink>
          </div>
        </nav>

        {/* versi mobile */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5"></a>
              <strong>BPBD PROV.SULTENG</strong>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <NavLink
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Beranda
                  </NavLink>
                  <Popover.Group className=" lg:flex lg:gap-x-12">
                    <Popover className="relative">
                      <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Master Data
                        <ChevronDownIcon
                          className="h-5 w-5 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-50 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                          <div className="p-4">
                            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                              <NavLink
                                to="/data-bencana-publik"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Data Bencana
                              </NavLink>
                            </div>
                            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                              <NavLink
                                to="/data-logpal-publik"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Data Logpal
                              </NavLink>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </Popover.Group>
                  
                  <NavLink
                    to="/dokumen-publik"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dokumen
                  </NavLink>

                  <NavLink
                    to="/dokumen-publik"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Informasi
                  </NavLink>
                  
                  
                  <Popover.Group className="lg:flex lg:gap-x-12">
                    <Popover className="relative">
                      <Popover.Button className="flex items-center gap-x-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Publikasi
                        <ChevronDownIcon
                          className="h-5 w-5 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-30 overflow-hidden rounded-3xl bg-white dark:bg-boxdark dark:drop-shadow-none shadow-lg ring-1 ring-gray-900/5">
                          <div className="p-4">
                            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                              <NavLink
                                to="/berita-publik"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Berita
                              </NavLink>
                            </div>
                            <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                              <a
                                href="#"
                                className="text-sm font-semibold leading-6 text-gray-900"
                              >
                                Majalah
                              </a>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  </Popover.Group>

                  <NavLink
                    to="/auth/signin"
                    className="flex items-center py-2 gap-x-1 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Sign In <span aria-hidden="true">&rarr;</span>
                  </NavLink>

                  <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                      {/* <!-- Dark Mode Toggler --> */}
                      <DarkModeSwitcher />
                      {/* <!-- Dark Mode Toggler --> */}

                      {/* <!-- Notification Menu Area --> */}
                      <DropdownNotification />
                      {/* <!-- Notification Menu Area --> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
