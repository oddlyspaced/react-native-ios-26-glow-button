import {
	Dimensions,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {
	SafeAreaView,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { AnimatedGlowButton } from './AnimatedGlowButton';

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

export const HomeScreen = () => {
	const { bottom } = useSafeAreaInsets();

	return (
		<SafeAreaView style={styles.safeArea}>
			<Image
				source={require('./assets/mapss.png')}
				style={styles.mapImage}
			/>

			<View style={styles.flexSpacer} />

			<View style={[styles.sheet, { marginBottom: -bottom }]}>
				<Pressable style={styles.container}>
					<Text style={styles.cross}>×</Text>
				</Pressable>

				<Text style={styles.title}>Add New Item</Text>

				<Image
					source={require('./assets/findmyitems.png')}
					width={DEVICE_WIDTH}
					height={100}
					style={styles.bannerImage}
					resizeMode={'contain'}
				/>

				<View style={styles.firstButtonWrapper}>
					<AnimatedGlowButton
						backgroundColor='#2B85FF'
						glowColorStartIntensity={40}
						glowColorEndIntensity={20}
						height={56}
						text='Add AirTag'
					/>
				</View>

				<View style={styles.secondButtonWrapper}>
					<AnimatedGlowButton
						backgroundColor='#1C1C1C'
						glowColorStartIntensity={20}
						glowColorEndIntensity={5}
						height={56}
						text='Other Supported Items'
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#000',
	},
	mapImage: {
		position: 'absolute',
		height: DEVICE_HEIGHT,
		width: DEVICE_WIDTH,
		opacity: 0.5,
	},
	flexSpacer: {
		flex: 1,
	},
	sheet: {
		backgroundColor: '#1C1C1F',
		height: '52%',
		marginHorizontal: 4,
		borderRadius: 40,
		shadowOpacity: 0.8,
		shadowColor: '#000',
		shadowRadius: 1,
		shadowOffset: {
			height: -5,
			width: 0,
		},
	},
	container: {
		backgroundColor: '#323235',
		width: 24,
		height: 24,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 20,
		top: 16,
	},
	cross: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
		lineHeight: 22,
	},
	title: {
		color: 'white',
		fontWeight: '700',
		fontSize: 24,
		textAlign: 'center',
		marginTop: 32,
	},
	bannerImage: {
		marginTop: 40,
		height: 100,
		width: DEVICE_WIDTH,
	},
	firstButtonWrapper: {
		marginTop: 40,
	},
	secondButtonWrapper: {
		marginTop: 56 + 12,
	},
});
