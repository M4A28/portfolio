const c = (n) => `var(--${n})`
export default { content: ['./index.html','./src/**/*.{ts,tsx}'], theme: { 
  extend: { colors: { bg:c('bg'), alt:c('bg-alt'), fg:c('fg'), fg2:c('fg-secondary'), muted:c('fg-muted'), line:c('border'), strong:c('border-strong'), card:c('card'), hover:c('card-hover'), accent:c('brand') },
  maxWidth:{ grid:'1200px' } } }, plugins: [] }
