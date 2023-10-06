import clsx from 'clsx'
import React, { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

type CommonButtonProps = {
  color?: 'primary' | 'secondary'
  disabled?: boolean
  children: React.ReactNode
  size?: 'normal' | 'huge'
}

type PropsOf<T extends React.ElementType> = React.ComponentPropsWithRef<T>

type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref']

type PolymorphicProps<
  T extends React.ElementType = React.ElementType,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TProps = {}
> = {
  as?: T
} & TProps &
  Omit<PropsOf<T>, keyof TProps | 'as' | 'ref'> & { ref?: PolymorphicRef<T> }

export type ButtonProps<T extends React.ElementType = 'button'> =
  PolymorphicProps<T, CommonButtonProps>

type ButtonComponent = <T extends React.ElementType = 'button'>(
  props: PolymorphicProps<T, ButtonProps<T>>
) => React.ReactElement | null

export const Button: ButtonComponent = React.forwardRef(function InnerButton<
  T extends React.ElementType = 'button'
>(props: ButtonProps<T>, ref: PolymorphicRef<T>) {
  const mergedClassName = useMemo(() => {
    const { color = 'primary', size = 'normal', className } = props

    const merged = twMerge(
      clsx(
        'flex',
        'items-center',
        'justify-center',
        'flex-row',
        'gap-2',
        'transition-colors',
        'duration-300',
        'hover:bg-hover',
        'disabled:bg-disabled',
        'disabled:text-on-disabled',
        'disabled:hover:cursor-not-allowed',
        'disabled:hover:bg-disabled',
        size === 'normal' ? 'rounded py-1 px-2' : 'px-4 py-2 rounded-full',
        {
          ['bg-primary text-on-primary hover:bg-primary-hover shadow-sm shadow-shadow']:
            color === 'primary',
          ['bg-surface text-on-background']: color === 'secondary',
        },
        className
      )
    )

    return merged
  }, [props.className, props.color])

  const { size: _, color: __, ...rest } = props
  const Component = props.as ?? 'button'

  return <Component ref={ref} {...rest} className={mergedClassName} />
})

export default Button
