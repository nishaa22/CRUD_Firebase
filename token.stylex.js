import * as stylex from '@stylexjs/stylex';

export const tokens = stylex.defineVars({
	gradiantBackground: 'linear-gradient(45deg, #eba434, #af32e6)',
	hoverGradiantBackground: 'linear-gradient(45deg, #af32e6, #eba434)',
});

const pulse = stylex.keyframes({
	'0%': { transform: 'scale(1)' },
	'50%': { transform: 'scale(1.05)' },
	'100%': { transform: 'scale(1)' },
});

const fadeIn = stylex.keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const fadeOut = stylex.keyframes({
	'0%': { opacity: 1 },
	'100%': { opacity: 0 },
});

export const animations = stylex.defineVars({
	pulse,
	fadeIn,
	fadeOut,
});
