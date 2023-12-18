import { SVGProps, Ref, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ref={ref} {...props}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16.001A8 8 0 0112 20z"></path>
      <path d="M12.34 7.45a1.7 1.7 0 00-1.85-.3 1.6 1.6 0 00-1 1.48v6.74a1.6 1.6 0 001 1.48c.217.098.452.15.69.15a1.74 1.74 0 001.16-.45L16 13.18a1.6 1.6 0 000-2.36l-3.66-3.37zm-.84 7.15V9.4l2.81 2.6-2.81 2.6z"></path>
    </svg>
  )
}

export const PlayIcon = forwardRef(SvgComponent)
