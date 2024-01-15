import { SVGProps, Ref, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <path d="M19 11H7.14l3.63-4.36a1.001 1.001 0 00-1.54-1.28l-5 6a1.191 1.191 0 00-.09.15c0 .05 0 .08-.07.13A1 1 0 004 12a1 1 0 00.07.36c0 .05 0 .08.07.13.026.052.056.102.09.15l5 6A1 1 0 0010 19a1 1 0 00.77-1.64L7.14 13H19a1 1 0 000-2z"></path>
    </svg>
  )
}

export const ArrowBackIcon = forwardRef(SvgComponent)
