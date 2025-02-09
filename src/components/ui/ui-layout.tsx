'use client'

import * as React from 'react'
import {ReactNode, Suspense, useEffect, useRef} from 'react'
import toast, {Toaster} from 'react-hot-toast'

import {ExplorerLink} from '../cluster/cluster-ui'
import {WalletButton} from '../solana/solana-provider'

export function UiLayout({ children, links }: { children: ReactNode; links: { label: string; path: string }[] }) {
  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-base-300 dark:text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0" style={{minHeight: 'auto', paddingBottom: '10px'}}>


        <div className="flex-1">
            <div className="flex w-full items-center justify-center">
              <span
                className="absolute mx-auto flex border w-fit bg-gradient-to-r blur-xl from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-3xl box-content font-extrabold text-transparent text-center select-none">
                <p><a href={'/'}>Hypes.zone</a></p>
              </span>
            <h1
              className="relative top-0 w-fit h-auto justify-center flex bg-gradient-to-r items-center from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-3xl font-extrabold text-transparent text-center select-auto">
              <p>
                <a href={'/'}>Hypes.zone</a>
              </p>
            </h1>
          </div>
        </div>

        <div className="flex-1">
          <a href={"https://hypes.zone"} target={"_blank"} rel={"noopener noreferrer nofollow"} className="btn btn-ghost btn-sm">
              <p>
                Back to Hypes.zone
              </p>
          </a>
        </div>

        <div className="flex-none space-x-2">
          <WalletButton/>
        </div>
      </div>

      <div className="flex-grow">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <div className="flex-1">
            <div className="flex w-full items-center justify-center">
              <span
                className="absolute mx-auto flex border w-fit bg-gradient-to-r blur-xl from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-2xl box-content font-extrabold text-transparent text-center select-none">
                <p>Hypes.zone</p>
              </span>
              <h1
                className="relative top-0 w-fit h-auto justify-center flex bg-gradient-to-r items-center from-pink-500 via-indigo-500 to-green-500 bg-clip-text text-2xl font-extrabold text-transparent text-center select-auto">
                <p>Hypes.zone</p>
              </h1>
            </div>
          </div>
        </aside>
      </footer>
    </div>
  )
}

export function AppModal({
                           children,
                           title,
                           hide,
                           show,
                           submit,
                           submitDisabled,
                           submitLabel,
                         }: {
  children: ReactNode
  title: string
  hide: () => void
  show: boolean
  submit?: () => void
  submitDisabled?: boolean
  submitLabel?: string
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (!dialogRef.current) return
    if (show) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [show, dialogRef])

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2">
            {submit ? (
              <button className="btn btn-xs lg:btn-md btn-primary" onClick={submit} disabled={submitDisabled}>
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode
  title: ReactNode
  subtitle: ReactNode
}) {
  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  )
}

