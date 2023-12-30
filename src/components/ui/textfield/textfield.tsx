import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './textfield.module.scss'

import { CloseIcon } from '@/assets/icons/CloseIcon.tsx'
import { Eye } from '@/assets/icons/Eye.tsx'
import { EyeOff } from '@/assets/icons/EyeOff.tsx'
import { Search } from '@/assets/icons/Search.tsx'
import { Typography } from '@/components/ui/typography'

type Props = {
  type: 'text' | 'password' | 'search'
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ type, id, label, disabled, ...rest }, ref) => {
    const [value, setValue] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const isSearchType = type === 'search'

    // const isPasswordType = type === 'password'

    // const showPassword = isPasswordType

    const classes = {
      input: clsx(s.input, value && s.active, isSearchType && s.withIcon),
      icon: clsx(s.icon, value && s.activeIcon),
      wrapper: clsx(s.wrapper, disabled && s.disabled),
    }

    const togglePassword = () => {
      setShowPassword(!showPassword)
    }

    const finalType = type === 'password' && showPassword ? 'text' : type

    return (
      <div className={classes.wrapper}>
        <label htmlFor={id} className={s.label}>
          <Typography as="label" variant="body2">
            {label}
          </Typography>
        </label>
        <div className={s.inputWrapper}>
          {isSearchType && <Search className={classes.icon} />}
          <input
            type={finalType}
            id={id}
            className={classes.input}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            ref={ref}
            {...rest}
          />
          {isSearchType && value && (
            <CloseIcon className={s.closeIcon} onClick={() => setValue('')} />
          )}
          {type === 'password' && (
            <button className={s.showPasswordIcon} onClick={togglePassword}>
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)
