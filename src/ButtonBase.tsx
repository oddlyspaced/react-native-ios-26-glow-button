import React from 'react';
import {
	Dimensions,
	GestureResponderEvent,
	Platform,
	StyleSheet,
} from 'react-native';
import Animated, {
	useSharedValue,
	useDerivedValue,
	useAnimatedStyle,
	withTiming,
	withSpring,
} from 'react-native-reanimated';
import {
	Canvas,
	matchFont,
	RoundedRect,
	Text,
	TwoPointConicalGradient,
	vec,
} from '@shopify/react-native-skia';

const DEVICE_WIDTH = Dimensions.get('screen').width;
const OFFSET = 5;
const SCALE = 1.05;

const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' });
const fontStyle = {
	fontFamily,
	fontSize: 14,
	fontWeight: '600',
};
// @ts-ignore
const font = matchFont(fontStyle);

const lightenHexColor = (hex: string, percent: number) => {
	const amt = Math.round(2.55 * percent);
	return (
		'#' +
		hex
			.replace(/^#/, '')
			.replace(/../g, (color) =>
				(
					'0' +
					Math.min(
						255,
						Math.max(0, parseInt(color, 16) + amt),
					).toString(16)
				).slice(-2),
			)
	);
};

interface IAnimatedGlowButtonProps {
	backgroundColor?: string;
	glowColorStartIntensity?: number;
	glowColorEndIntensity?: number;
	height?: number;
	text?: string;
}

export const AnimatedGlowButton = ({
	backgroundColor = '#2B85FF',
	glowColorStartIntensity = 40,
	glowColorEndIntensity = 20,
	height = 64,
	text = '',
}: IAnimatedGlowButtonProps) => {
	const btnWidth = DEVICE_WIDTH - 72;
	const btnHeight = height;

	const glowColor1 = lightenHexColor(
		backgroundColor,
		glowColorStartIntensity,
	);
	const glowColor2 = lightenHexColor(backgroundColor, glowColorEndIntensity);

	const touchX = useSharedValue(btnWidth / 2);
	const touchY = useSharedValue(btnHeight / 2);
	const startRadius = useSharedValue(0);
	const endRadius = useSharedValue(0);
	const translateX = useSharedValue(0);
	const scale = useSharedValue(1);

	const handleStart = (event: GestureResponderEvent) => {
		const { locationX, locationY } = event.nativeEvent;
		touchX.value = locationX;
		touchY.value = locationY;
		startRadius.value = withTiming(20, { duration: 80 });
		endRadius.value = withTiming(180, { duration: 80 });

		const normalized = (locationX - btnWidth / 2) / (btnWidth / 2);
		translateX.value = Math.max(-1, Math.min(1, normalized)) * OFFSET;
		scale.value = withTiming(SCALE, { duration: 160 });
	};

	const handleMove = (event: GestureResponderEvent) => {
		const { locationX, locationY } = event.nativeEvent;
		touchX.value = locationX;
		touchY.value = locationY;

		const normalized = (locationX - btnWidth / 2) / (btnWidth / 2);
		translateX.value = Math.max(-1, Math.min(1, normalized)) * OFFSET;
	};

	const handleRelease = () => {
		startRadius.value = withTiming(0, { duration: 80 });
		endRadius.value = withTiming(0, { duration: 80 });
		translateX.value = withSpring(0, { damping: 10, stiffness: 120 });
		scale.value = withTiming(1, { duration: 80 });
	};

	const start = useDerivedValue(() => vec(touchX.value, touchY.value), []);
	const end = useDerivedValue(() => vec(touchX.value, touchY.value), []);
	const startR = useDerivedValue(() => startRadius.value, []);
	const endR = useDerivedValue(() => endRadius.value, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }, { scale: scale.value }],
	}));

	const textX = btnWidth / 2 - font.measureText(text).width / 2;
	const textY = btnHeight / 2 + font.measureText(text).height / 2 - 4;

	return (
		<Animated.View
			style={[styles.animatedWrapper, animatedStyle]}
			onStartShouldSetResponder={() => true}
			onResponderGrant={handleStart}
			onResponderMove={handleMove}
			onResponderRelease={handleRelease}
		>
			<Canvas style={{ width: btnWidth, height: btnHeight }}>
				<RoundedRect
					x={0}
					y={0}
					width={btnWidth}
					height={btnHeight}
					r={btnHeight / 2}
					color={backgroundColor}
				>
					<Text
						text={text}
						x={textX}
						y={textY}
						color={'white'}
						font={font}
					/>
					<TwoPointConicalGradient
						start={start}
						startR={startR}
						end={end}
						endR={endR}
						colors={[glowColor1, glowColor2]}
					/>
				</RoundedRect>
			</Canvas>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	animatedWrapper: {
		position: 'absolute',
		left: (DEVICE_WIDTH - (DEVICE_WIDTH - 72)) / 2,
		width: DEVICE_WIDTH - 72,
		height: 64,
	},
});
