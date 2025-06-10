import React from 'react';
import { Dimensions, GestureResponderEvent, StyleSheet } from 'react-native';
import Animated, {
	useSharedValue,
	useDerivedValue,
	useAnimatedStyle,
	withTiming,
	withSpring,
} from 'react-native-reanimated';
import {
	Canvas,
	RoundedRect,
	TwoPointConicalGradient,
	vec,
} from '@shopify/react-native-skia';

const DEVICE_WIDTH = Dimensions.get('screen').width;
const OFFSET = 5;

export const AnimatedGlowButton = () => {
	const btnWidth = DEVICE_WIDTH - 72;
	const btnHeight = 64;

	const touchX = useSharedValue(btnWidth / 2);
	const touchY = useSharedValue(btnHeight / 2);
	const startRadius = useSharedValue(0);
	const endRadius = useSharedValue(0); // Start hidden
	const translateX = useSharedValue(0);

	const handleStart = (event: GestureResponderEvent) => {
		const { locationX, locationY } = event.nativeEvent;

		touchX.value = locationX;
		touchY.value = locationY;
		startRadius.value = withTiming(20, { duration: 80 });
		endRadius.value = withTiming(180, { duration: 80 });

		const normalized = (locationX - btnWidth / 2) / (btnWidth / 2);
		translateX.value = Math.max(-1, Math.min(1, normalized)) * OFFSET; // left right
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
		translateX.value = withSpring(0, {
			damping: 10,
			stiffness: 120,
		});
	};

	const start = useDerivedValue(() => vec(touchX.value, touchY.value), []);
	const end = useDerivedValue(() => vec(touchX.value, touchY.value), []);
	const startR = useDerivedValue(() => startRadius.value, []);
	const endR = useDerivedValue(() => endRadius.value, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

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
					color={'#2B85FF'}
				>
					<TwoPointConicalGradient
						start={start}
						startR={startR}
						end={end}
						endR={endR}
						colors={['#44FEFF', '#2B94FF']}
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
