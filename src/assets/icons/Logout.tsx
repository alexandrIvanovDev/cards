import { SVGProps, Ref, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      // fill="none"
      // viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <path
        // fill="#000"
        d="M7 6a1 1 0 000-2H5a1 1 0 00-1 1v14a1 1 0 001 1h2a1 1 0 000-2H6V6h1zM20.82 11.42l-2.82-4a1 1 0 10-1.63 1.16L18.09 11H10a1 1 0 000 2h8l-1.8 2.4a1 1 0 001.6 1.2l3-4a1 1 0 00.02-1.18z"
      ></path>
    </svg>
  )
}

export const LogoutIcon = forwardRef(SvgComponent)
