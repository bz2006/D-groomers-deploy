import React from 'react'

type Props = {}

const ConfirmHeader = (props: Props) => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/dgroomers.png"
            alt="D_Groomer"
            className="h-8 w-auto"
          />
        </div>
        <div>
          <button className="bg-transparent text-black px-4 py-2 rounded-md " >
            <a href="/">Exit</a>
          </button>
        </div>
      </div>
    </header>
  )
}

export default ConfirmHeader