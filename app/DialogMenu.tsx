import React, { Fragment } from "react"

import { Dialog, Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { useMediaQuery } from "usehooks-ts"
import { useSnapshot } from "valtio"

import { state, toggleCart } from "~/state"

interface DialogMenuProps {
  title: string
  children: React.ReactNode
  open: boolean
  close: () => void
  closeIcon?: React.ReactNode
}

export default function DialogMenu({ title, children, open, close, closeIcon = <XMarkIcon className="h-6 w-6" /> }: DialogMenuProps) {
  return (
    <Dialog
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ transition: { duration: 0.15 }, opacity: 0 }}
      open={open}
      onClose={close}
      className="fixed inset-0 border-gray-300 shadow-lg z-50"
    >
      <div className="fixed inset-0 z-10 bg-black opacity-30" />

      <Dialog.Panel>
        <div className="sm:grid place-items-center h-screen hidden">
          <motion.div className="bg-white rounded-2xl border border-gray-200 max-w-3xl w-full mx-auto z-30 relative">
            <div className="justify-between items-center px-4 pb-4 pt-2.5 flex">
              <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                {title}
              </Dialog.Title>

              <button onClick={close} className="focus:outline-none">
                {closeIcon}
              </button>
            </div>

            {children}
          </motion.div>
        </div>

        <motion.div
          className="fixed w-full bottom-0 z-30 border border-gray-200 bg-white rounded-t-2xl"
          initial="hidden"
          animate="visible"
          // better without exit animation but can be turned on
          //   exit="hidden"
          variants={{
            visible: { y: 0 },
            hidden: { y: "100%" },
          }}
          // transition={{
          //   type: "spring",
          //   damping: 40,
          //   stiffness: 400,
          //   duration: 20,
          // }}
          //   exit={{ y: "100%", transition: { duration: 0.2 } }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          // prevents ios like overscroll behaviour
          dragMomentum={false}
          // together with drag momentum makes it so that no weird bouncy effect, need to use both
          dragElastic={false}
          //   onDrag={console.log}
          onDragEnd={(e, { velocity }) => {
            if (velocity.y > 35) {
              close()
            }
          }}
        >
          <div className="mt-1.5">
            <hr className="w-10 h-1.5 bg-gray-400 rounded-full mx-auto" />
          </div>

          <div className="flex justify-between items-center px-4 pb-4 pt-2.5">
            <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
              {title}
            </Dialog.Title>

            <button onClick={close} className="focus:outline-none">
              {closeIcon}
            </button>
          </div>

          <hr className="w-full bg-gray-500" />

          {children}

          {/* place for a button that slides in from the bottom */}
          {/* <motion.div className="absolute inset-x-0 bottom-4 flex justify-center py-6" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 1 }}>
                Hey
              </motion.div> */}
        </motion.div>
      </Dialog.Panel>
    </Dialog>
  )
}

DialogMenu.Container = function DialogMenuContainer({ children }: { children: React.ReactNode }) {
  return <div className="py-4 px-4 overflow-x-auto h-80 sm:h-96">{children}</div>
}

DialogMenu.Base = function DialogMenuBase({ className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ transition: { duration: 0.3 }, opacity: 0 }}
      className={clsx("fixed inset-0 border-gray-300 shadow-lg z-50", className)}
      {...props}
    />
  )
}

DialogMenu.Slideup = function DialogMenuSlideup({ className, onClose, children }: { onClose: () => void; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={clsx("fixed w-full bottom-0 z-50 border border-gray-200 bg-accent-200 rounded-t-2xl", className)}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" },
      }}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400,
        duration: 0,
      }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      // prevents ios like overscroll behaviour
      dragMomentum={false}
      // together with drag momentum makes it so that no weird bouncy effect, need to use both
      dragElastic={false}
      //   onDrag={console.log}
      onDragEnd={(e, { velocity }) => {
        if (velocity.y > 35) {
          onClose()
        }
      }}
      children={children}
    />
  )
}

export function CartDialog() {
  const snap = useSnapshot(state)

  const onClose = () => {
    state.cartOpen = false
  }

  const open = snap.cartOpen

  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div>
      <AnimatePresence>
        {open && isMobile && (
          <Dialog as={DialogMenu.Base} onClose={onClose} open={true}>
            <Dialog.Backdrop
              as={motion.div}
              className="fixed inset-0 z-10 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ transition: { duration: 0.15 }, opacity: 0 }}
            />

            {/* <Dialog.Panel> */}
              <DialogMenu.Slideup onClose={onClose}>
                <div className="mt-1.5">
                  <hr className="w-10 h-1.5 bg-gray-400 rounded-full mx-auto" />
                </div>
                <div className="pb-4 pt-2.5">
                  <div className="flex justify-between items-center px-4">
                    <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                      Cart
                    </Dialog.Title>

                    <button onClick={onClose} className="focus:outline-none">
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="h-64 w-full">Test</div>
                  {/* {children} */}
                </div>
              </DialogMenu.Slideup>
            {/* </Dialog.Panel> */}
          </Dialog>
        )}
      </AnimatePresence>

      {!isMobile && (
        <Transition appear show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={toggleCart}>
            <Dialog.Backdrop className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-accent-200 py-6 shadow-2xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-semibold leading-6 text-slate-900">Cart {String(open)}</Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                onClick={toggleCart}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          {/* Replace with your content */}
                          <div className="absolute inset-0 px-4 sm:px-6">
                            <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                          </div>
                          {/* /End replace */}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  )
}
