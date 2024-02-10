import { SVGProps, Ref, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" ref={ref} {...props}>
      <circle cx="12" cy="12" r="8.5" fill="none"></circle>
      <g clipPath="url(#a)" stroke="transparent">
        <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0-3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#000" d="M6 6h12v12H6z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export const MoreIcon = forwardRef(SvgComponent)
