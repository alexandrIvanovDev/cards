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
        d="M12 11a4 4 0 100-8 4 4 0 000 8zm0-6a2 2 0 110 4 2 2 0 010-4zM12 13a7 7 0 00-7 7 1 1 0 102 0 5 5 0 1110 0 1 1 0 002 0 7 7 0 00-7-7z"
      ></path>
    </svg>
  )
}

export const ProfileIcon = forwardRef(SvgComponent)
