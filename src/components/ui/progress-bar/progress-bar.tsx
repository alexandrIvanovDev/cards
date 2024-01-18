import { clsx } from 'clsx'

import s from './progress-bar.module.scss'

export const ProgressBar = () => {
  return (
    <div className={s.wrapper}>
      <div className={clsx(s.progress2, s.progressMoved)}>
        <div className={s.progressBar2}></div>
      </div>
    </div>
  )
}
