import { forwardRef, Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";

export default function MyModal() {
  let [open1, setOpen1] = useState(false);
  let [open2, setOpen2] = useState(false);

  function closeModal1() {
    setOpen1(false);
  }

  function closeModal2() {
    setOpen2(false);
  }

  return (
    <div className="">
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />
      <Example />

      {/* HeadlessUI Dialog, flickering appears on safari mobile (have to use real iPhone) */}
      <Transition appear show={open1} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal1}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal1}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={open2} as={Fragment}>
        <div className="relative z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                  <div
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal2}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Transition>

      <div className="mt-24 mb-24 flex gap-8">
        <button
          type="button"
          onClick={() => setOpen1(true)}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open Headless Dialog
        </button>

        <button
          type="button"
          onClick={() => setOpen2(true)}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open Div Dialog
        </button>
      </div>
    </div>
  );
}

// Important: Flickering only happens when div is scrollable. If you remove the overflow-x-scroll class, the flickering will not happen.
// and it only happens when there is more content in total than the screen height. If you remove a few examples from the list so the y axis doesn't overflow, the flickering will not happen as well.
function Example() {
  return (
    <div className="overflow-x-scroll mt-2 sm:mt-4 flex gap-2 scrollbar-hidden -mb-10 pb-10 px-1.5">
      <a href="/${pack.id}">
        <div
          role="button"
          className="group relative rounded-xl overflow-hidden bg-accent-200 h-full shadow-xl shrink-0 w-28 h-44 sm:w-32 sm:h-52"
        >
          <div className="relative h-full">
            <div className="w-full h-full rounded-xl flex relative snap-x snap-mandatory overflow-x-auto aspect-1 snap-always scrollbar-hidden">
              <div className="snap-center w-full h-full shrink-0 max-w-full first:rounded-l-xl last:rounded-r-xl max-h-full overflow-hidden">
                <img
                  alt=""
                  className="h-full w-full object-cover bg-white"
                  src="https://results-dev.oddlynew.com/clcfe4ihq0000w07oqqv6sihz/cld3r8lja000dk0g1esi47isd/cld3sfl60000j08mnglgheg5s-3"
                />
              </div>
            </div>
          </div>
          <div className="absolute px-2 pb-3 pt-4 inset-x-0 bottom-0 bg-gradient-to-t from-black/80 w-full py-2 pointer-events-none rounded-b-xl">
            <span className="text-white text-xs font-medium leading-none block truncate">
              Graffiti
            </span>
            <span className="text-gray-200 text-xs leading-normal block">
              23+ images
            </span>
          </div>
        </div>
      </a>
      <a href="/${pack.id}">
        <div
          role="button"
          className="group relative rounded-xl overflow-hidden bg-accent-200 h-full shadow-xl shrink-0 w-28 h-44 sm:w-32 sm:h-52"
        >
          <div className="relative h-full">
            <div className="w-full h-full rounded-xl flex relative snap-x snap-mandatory overflow-x-auto aspect-1 snap-always scrollbar-hidden">
              <div className="snap-center w-full h-full shrink-0 max-w-full first:rounded-l-xl last:rounded-r-xl max-h-full overflow-hidden">
                <img
                  alt=""
                  className="h-full w-full object-cover bg-white"
                  src="https://results-dev.oddlynew.com/clcfe4ihq0000w07oqqv6sihz/cld3r8lja000dk0g1esi47isd/cld3sfo38000a08l81d9k5ef5-1"
                />
              </div>
            </div>
          </div>
          <div className="absolute px-2 pb-3 pt-4 inset-x-0 bottom-0 bg-gradient-to-t from-black/80 w-full py-2 pointer-events-none rounded-b-xl">
            <span className="text-white text-xs font-medium leading-none block truncate">
              Painted, 19th century
            </span>
            <span className="text-gray-200 text-xs leading-normal block">
              15+ images
            </span>
          </div>
        </div>
      </a>
      <a href="/${pack.id}">
        <div
          role="button"
          className="group relative rounded-xl overflow-hidden bg-accent-200 h-full shadow-xl shrink-0 w-28 h-44 sm:w-32 sm:h-52"
        >
          <div className="relative h-full">
            <div className="w-full h-full rounded-xl flex relative snap-x snap-mandatory overflow-x-auto aspect-1 snap-always scrollbar-hidden">
              <div className="snap-center w-full h-full shrink-0 max-w-full first:rounded-l-xl last:rounded-r-xl max-h-full overflow-hidden">
                <img
                  alt=""
                  className="h-full w-full object-cover bg-white"
                  src="https://results-dev.oddlynew.com/clcfe4ihq0000w07oqqv6sihz/cld3r8lja000dk0g1esi47isd/cld3sfnnu000808l83p4g9s00-0"
                />
              </div>
            </div>
          </div>
          <div className="absolute px-2 pb-3 pt-4 inset-x-0 bottom-0 bg-gradient-to-t from-black/80 w-full py-2 pointer-events-none rounded-b-xl">
            <span className="text-white text-xs font-medium leading-none block truncate">
              Paintings
            </span>
            <span className="text-gray-200 text-xs leading-normal block">
              23+ images
            </span>
          </div>
        </div>
      </a>
      <a href="/${pack.id}">
        <div
          role="button"
          className="group relative rounded-xl overflow-hidden bg-accent-200 h-full shadow-xl shrink-0 w-28 h-44 sm:w-32 sm:h-52"
        >
          <div className="relative h-full">
            <div className="w-full h-full rounded-xl flex relative snap-x snap-mandatory overflow-x-auto aspect-1 snap-always scrollbar-hidden">
              <div className="snap-center w-full h-full shrink-0 max-w-full first:rounded-l-xl last:rounded-r-xl max-h-full overflow-hidden">
                <img
                  alt=""
                  className="h-full w-full object-cover bg-white"
                  src="https://results-dev.oddlynew.com/clcfe4ihq0000w07oqqv6sihz/clcqhbtkv0007w08arrwhg45w/clcqhc52c000008js3om86a8o-2"
                />
              </div>
            </div>
          </div>
          <div className="absolute px-2 pb-3 pt-4 inset-x-0 bottom-0 bg-gradient-to-t from-black/80 w-full py-2 pointer-events-none rounded-b-xl">
            <span className="text-white text-xs font-medium leading-none block truncate">
              Superhero
            </span>
            <span className="text-gray-200 text-xs leading-normal block">
              35+ images
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
