import { SVGProps, Ref, forwardRef } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      ref={ref}
      {...props}
    >
      <circle cx="50" cy="50" r="0" fill="none" strokeWidth="2">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="0.9900990099009901s"
          keySplines="0 0.2 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="0;49"
        ></animate>
        <animate
          attributeName="opacity"
          begin="0s"
          calcMode="spline"
          dur="0.9900990099009901s"
          keySplines="0.2 0 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </circle>
      <circle cx="50" cy="50" r="0" fill="none" strokeWidth="2">
        <animate
          attributeName="r"
          begin="-0.49504950495049505s"
          calcMode="spline"
          dur="0.9900990099009901s"
          keySplines="0 0.2 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="0;49"
        ></animate>
        <animate
          attributeName="opacity"
          begin="-0.49504950495049505s"
          calcMode="spline"
          dur="0.9900990099009901s"
          keySplines="0.2 0 0.8 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="1;0"
        ></animate>
      </circle>
    </svg>
  )
}

export const LoaderSpinner = forwardRef(SvgComponent)
