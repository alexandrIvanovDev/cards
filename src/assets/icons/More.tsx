import { SVGProps, Ref, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      ref={ref}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" stroke="#fff"></circle>
      <g fill="#fff" clipPath="url(#clip0_5928_6379)">
        <path d="M12 13a1 1 0 100-2 1 1 0 000 2zM12 9.5a1 1 0 100-2 1 1 0 000 2zM12 16.5a1 1 0 100-2 1 1 0 000 2z"></path>
      </g>
      <defs>
        <clipPath id="clip0_5928_6379">
          <path fill="#000" d="M0 0H12V12H0z" transform="translate(6 6)"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export const MoreIcon = forwardRef(SvgComponent)
