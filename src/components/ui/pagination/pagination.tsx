import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

import s from './pagination.module.scss'

import { ArrowPageBackIcon } from '@/assets/icons/ArrowPageBack.tsx'
import { ArrowPageForwardIcon } from '@/assets/icons/ArrowPageForward.tsx'
import { returnPaginationRange } from '@/common/utils/returnPaginationRange.ts'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

type Props = {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  changePage: (value: number) => void
  changePageSize: (value: number) => void
  totalCount?: number
  className?: string
}

export const Pagination = (props: Props) => {
  const {
    currentPage,
    totalPages,
    changePage,
    changePageSize,
    itemsPerPage,
    totalCount = 5,
    className,
  } = props

  const { t } = useTranslation()

  const pages = returnPaginationRange(totalPages, currentPage, 1)

  const selectOptions = [
    { value: '5', label: '5' },
    { value: '7', label: '7' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
  ]

  const leftArrowDisabled = currentPage === 1
  const rightArrowDisabled = currentPage === totalPages

  const classes = {
    wrapper: clsx(s.wrapper, className),
    leftArrow: clsx(s.arrowIcon, leftArrowDisabled && s.disabled),
    rightArrow: clsx(s.arrowIcon, rightArrowDisabled && s.disabled),
  }

  if (pages.length === 0 || totalCount < 5) return null

  return (
    <div className={classes.wrapper}>
      <div className={s.pages}>
        <button className={s.arrowBtn} disabled={leftArrowDisabled}>
          <ArrowPageBackIcon
            className={classes.leftArrow}
            onClick={() => changePage(currentPage - 1)}
          />
        </button>

        {pages.map((page: string | number, i: number) => {
          return typeof page === 'number' ? (
            <div
              key={i}
              className={clsx(s.page, currentPage === page && s.activePage)}
              onClick={() => changePage(page)}
            >
              <Typography as={'p'} variant={'body2'}>
                {page}
              </Typography>
            </div>
          ) : (
            <div className={s.dots} key={i}>
              {page}
            </div>
          )
        })}

        <button className={s.arrowBtn} disabled={rightArrowDisabled}>
          <ArrowPageForwardIcon
            className={classes.rightArrow}
            onClick={() => changePage(currentPage + 1)}
          />
        </button>
      </div>

      <div className={s.control}>
        <Typography as={'p'} variant={'body2'}>
          {t('Show')}
        </Typography>
        <Select
          options={selectOptions}
          value={String(itemsPerPage)}
          smallSize
          onChange={e => changePageSize(+e)}
        />
        <Typography as={'p'} variant={'body2'}>
          {t('on the page')}
        </Typography>
      </div>
    </div>
  )
}
