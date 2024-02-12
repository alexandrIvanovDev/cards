import { ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

const Root: FC<ComponentPropsWithoutRef<'table'>> = ({ className, ...rest }) => {
  const mainClass = clsx(s.root, className)

  return <table className={mainClass} {...rest} />
}

const Head: FC<ComponentPropsWithoutRef<'thead'>> = props => {
  return <thead {...props} />
}

const Body: FC<ComponentPropsWithoutRef<'tbody'>> = props => {
  return <tbody {...props} />
}

const HeadCell: FC<ComponentPropsWithoutRef<'th'>> = ({ className, ...rest }) => {
  const mainClass = clsx(s.headCell, className)

  return <th className={mainClass} {...rest} />
}

const Row: FC<ComponentPropsWithoutRef<'tr'>> = ({ className, ...rest }) => {
  const mainClass = clsx(s.tableRow, className)

  return <tr className={mainClass} {...rest} />
}

const Cell: FC<ComponentPropsWithoutRef<'td'>> = ({ className, ...rest }) => {
  const mainClass = clsx(s.cell, className)

  return <td className={mainClass} {...rest} />
}

export const Table = { Root, Row, Cell, HeadCell, Head, Body }
