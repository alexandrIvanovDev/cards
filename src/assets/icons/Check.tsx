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
      <path fill="#fff" d="M0 0h24v24H0V0z"></path>
      <path d="M9 16.17L5.53 12.7a.996.996 0 10-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 10-1.41-1.41L9 16.17z"></path>
    </svg>
  )
}

export const CheckIcon = forwardRef(SvgComponent)
