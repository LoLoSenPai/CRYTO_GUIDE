/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			night: {
  				'600': '#1B2230',
  				'700': '#151B25',
  				'800': '#0F141B',
  				'900': '#0B0F14'
  			},
  			sand: {
  				'200': '#F4F0EA',
  				'300': '#E7DFCF',
  				'400': '#D7C9B6'
  			},
  			teal: {
  				'300': '#5CE0D8',
  				'400': '#34CBBF',
  				'500': '#17A9A0'
  			},
  			amber: {
  				'300': '#FFD27D',
  				'400': '#F7B955',
  				'500': '#E79A1C'
  			},
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
  		},
  		fontFamily: {
  			display: [
  				'var(--font-display)',
  				'system-ui',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-body)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			glow: '0 0 0 1px rgba(255,255,255,0.05), 0 12px 40px rgba(0,0,0,0.45)',
  			inset: 'inset 0 1px 0 rgba(255,255,255,0.04)'
  		},
  		backgroundImage: {
  			grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
};
