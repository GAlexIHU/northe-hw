import React, { useLayoutEffect } from 'react'

interface IToastProps {
  message: string
  onHideToast: () => void
}

export default function Toast({ message, onHideToast }: IToastProps) {
  useLayoutEffect(() => {
    setTimeout(function () {
      // hide toast after 5 seconds
      onHideToast()
    }, 5000)
  }, [onHideToast])

  return (
    <div
      id="toast-simple"
      className="absolute bottom-10 right-10 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <div className="pl-4 text-sm font-normal">{message}</div>
    </div>
  )
}
