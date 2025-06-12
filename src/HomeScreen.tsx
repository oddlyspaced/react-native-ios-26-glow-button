import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedGlowButton } from './ButtonBase';

export const HomeScreen = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#1C1C1C',
			}}
		>
			<View
				style={{
					flex: 1,
				}}
			>
				<Text
					style={{
						color: 'white',
						textAlign: 'center',
					}}
				>
					Test
				</Text>

				<View
					style={{
						marginTop: 40,
						flex: 1,
					}}
				>
					<View style={{}}>
						<AnimatedGlowButton
							backgroundColor='#2B85FF'
							glowColorStartIntensity={40}
							glowColorEndIntensity={20}
							height={56}
							text='Add AirTag'
						/>
					</View>
					<View
						style={{
							marginTop: 56 + 12,
						}}
					>
						<AnimatedGlowButton
							backgroundColor='#1C1C1C'
							glowColorStartIntensity={20}
							glowColorEndIntensity={5}
							height={56}
							text='Other Supported Items'
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};
