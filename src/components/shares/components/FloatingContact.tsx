"use client"

import Image from "next/image"
import Link from "next/link"

const ContactButton = () => {
  const iconContactStyle =
    "h-12 w-12 bg-white border rounded-full border-[#D9E0EC] flex items-center justify-center cursor-pointer pointer-events-auto button-contact-hover-effect hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"

  return (
    <div className={`fixed bottom-19 right-3 sm:bottom-25.5 lg:bottom-4 lg:right-4 w-full z-40 pointer-events-none`}>
      <div className="flex justify-end w-full h-auto">
        <div className="flex flex-col items-end gap-2">
          {/* Zalo Button */}
          <Link href="https://zalo.me/0367306158" rel="nofollow" target="_blank" className={iconContactStyle}>
            <Image src="/new-zalo-icon.svg" alt="Zalo contact" width={31} height={31} priority={false} />
          </Link>

          {/* Messenger Button */}
          <Link href="https://m.me/339690869699132" target="_blank" rel="nofollow" className={iconContactStyle}>
            <Image src="/new-messenger-icon.svg" alt="Messenger contact" width={31} height={31} priority={false} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContactButton
