module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // other plugins...
    'react-native-reanimated/plugin', // 👈 must be last
  ],
};
