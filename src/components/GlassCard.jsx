export default function GlassCard({ as: Tag = 'div', accent, className = '', children, ...rest }) {
  return (
    <Tag
      className={`sage-card ${className}`}
      style={accent ? { '--card-accent': accent } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
