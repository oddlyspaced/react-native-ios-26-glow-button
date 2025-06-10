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
					<AnimatedGlowButton />
				</View>
			</View>
		</SafeAreaView>
	);
};
