/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:      '#8BC34A',
        'primary-dk': '#388E3C',
        'bg-page':    '#F2F9F1',
        'bg-card':    '#DDEEDF',
        surface:      '#ffffff',
        'surface-2':  '#f8f9fa',
        'surface-3':  '#f1f3f5',
        border:       '#e9ecef',
        'border-md':  '#dee2e6',
        'tx-1':  '#111827',
        'tx-2':  '#374151',
        'tx-3':  '#6b7280',
        'tx-4':  '#9ca3af',
        success:    '#16a34a',
        'success-bg':'#f0fdf4',
        error:      '#dc2626',
        'error-bg': '#fef2f2',
        warning:    '#d97706',
        'warning-bg':'#fffbeb',
        btn: '#8BC34A',
      },
      fontFamily: { sans: ['Outfit', 'sans-serif'] },
      boxShadow: {
        card:       '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover':'0 6px 20px 0 rgb(0 0 0 / 0.08), 0 2px 6px -1px rgb(0 0 0 / 0.04)',
        dropdown:   '0 8px 24px 0 rgb(0 0 0 / 0.10)',
      },
    },
  },
  plugins: [],
}
