import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './textfield.module.scss'

import { CloseIcon } from '@/assets/icons/CloseIcon.tsx'
import { Eye } from '@/assets/icons/Eye.tsx'
import { EyeOff } from '@/assets/icons/EyeOff.tsx'
import { Search } from '@/assets/icons/Search.tsx'
import { Typography } from '@/components/ui/typography'

export type TextFieldProps = {
  type?: 'text' | 'password' | 'search' | 'number'
  label?: string
  error?: string | null
  clearValue?: () => void
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = 'text', id, label, disabled, error, value, clearValue, className, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const classes = {
      input: clsx(
        s.input,
        type === 'search' && s.withSearchIcon,
        type === 'password' && s.password,
        type === 'number' && s.numberType,
        error && s.error,
        value && s.active
      ),
      searchIcon: clsx(s.searchIcon, value && s.activeIcon),
      wrapper: clsx(s.wrapper, disabled && s.disabled, className),
      closeIconButton: clsx(s.btn, s.closeIconButton),
      showPasswordButton: clsx(s.btn, s.showPasswordButton, disabled && s.disabledIcon),
    }

    const togglePassword = () => {
      setShowPassword(!showPassword)
    }

    const finalType = type === 'password' && showPassword ? 'text' : type

    return (
      <div className={classes.wrapper}>
        {label && (
          <Typography as="label" variant="body2" htmlFor={id} className={s.label}>
            {label}
          </Typography>
        )}
        <div className={s.inputWrapper}>
          {finalType === 'search' && <Search className={classes.searchIcon} />}
          <input
            type={finalType}
            id={id}
            className={classes.input}
            value={value}
            ref={ref}
            disabled={disabled}
            {...rest}
          />
          {finalType === 'search' && value && (
            <button className={classes.closeIconButton}>
              <CloseIcon className={s.closeIcon} onClick={clearValue} />
            </button>
          )}
          {type === 'password' && (
            <button
              type="button"
              className={classes.showPasswordButton}
              onClick={togglePassword}
              disabled={disabled}
            >
              {showPassword ? (
                <EyeOff className={s.passwordIcon} />
              ) : (
                <Eye className={s.passwordIcon} />
              )}
            </button>
          )}
          {!!error && (
            <Typography variant="caption" as="span" className={s.errorMessage}>
              {error}
            </Typography>
          )}
        </div>
      </div>
    )
  }
)
