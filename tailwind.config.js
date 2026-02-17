/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		keyframes: {
  			'spin-slow': {
  				from: { transform: 'rotate(0deg)' },
  				to: { transform: 'rotate(360deg)' },
  			},
  			'pulse-planet': {
  				'0%, 100%': { transform: 'scale(1)' },
  				'30%': { transform: 'scale(0.9)' },
  			},
  			'pulse-planet-inverse': {
  				'0%, 100%': { transform: 'scale(0.9)' },
  				'50%': { transform: 'scale(1)' },
  			},
  		},
  		animation: {
  			'spin-slow': 'spin-slow 40s linear infinite',
  			'pulse-planet': 'pulse-planet 3s ease-in-out infinite',
  			'pulse-planet-inverse': 'pulse-planet-inverse 3s ease-in-out infinite',
  		},
  		borderRadius: {
  	
			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [],
}