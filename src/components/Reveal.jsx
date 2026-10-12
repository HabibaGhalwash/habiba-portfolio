import { useReveal } from '../hooks/useReveal'

/** Wrapper that fades/slides its content in the first time it scrolls into view. */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, on] = useReveal()
  return (
    <Tag ref={ref} className={`rv ${className}${on ? ' on' : ''}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
