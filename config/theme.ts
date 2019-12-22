export default {
	colors: {
		text: '#333',
		gray: {
			lightest: '#eeeeee',
			lighter: '#cccccc',
			medium: '#aaaaaa',
			darker: '#444444',
			darkest: '#111111'
		}
	},
	backgrounds: {
		faded_black_dark: 'rgba(0, 0, 0, 0.9)',
		faded_black: 'rgba(0, 0, 0, 0.5)',
		faded_black_light: 'rgba(0, 0, 0, 0.2)'
	},
	breakpoints: {
		tablet: '600px',
		desktop: '1000px'
	},
	dimensions: {
		0: '0',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		7: '2rem',
		8: '2.5rem',
		9: '3rem',
		10: '4rem',
		11: '5rem',
		12: '6rem',
		13: '8rem',
		14: '10rem',
		15: '12rem',
		16: '14rem',
		17: '16rem',
		18: '18rem',
		19: '20rem',
		20: '25rem'
	},
	text: {
		xs: '0.75rem',
		sm: '0.875rem',
		md: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
		'5xl': '3rem',
		'6xl': '4rem',
		'7xl': '5rem',
		'8xl': '6.5rem'
	},
	transitionTime: '0.3s',
	boxShadow: {
		all: '0 0 2px rgba(0,0,0,0.3)',
		bottom: '0 4px 2px -2px rgba(0,0,0,0.2)'
	},
	scale: {
		sm: 1.1
	},
	headerHeight: '4rem'
} as const;
