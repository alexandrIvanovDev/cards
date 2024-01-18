import { Component, ErrorInfo, ReactNode } from 'react'

import { ErrorPage } from '@/app/providers/errorBoudary/error-page.tsx'

type Props = {
  children?: ReactNode
}
type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <ErrorPage />
    }

    return children
  }
}
