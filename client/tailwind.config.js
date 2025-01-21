module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      // Blue sky theme
      skyBlue: '#87CEEB', // Primary sky blue
      lightSky: '#ADD8E6', // Lighter sky blue
      darkBlue: '#1E3A8A', // Dark blue for headings

      // Brown bear theme
      earthyBrown: '#A0522D', // Primary brown
      lightBeige: '#F5DEB3', // Beige for highlights
      lightBrown: '#B06538',
      // Accents
      warmYellow: '#FFD700', // Golden yellow for buttons and hover
      softWhite: '#F5F5F5', // For form backgrounds
      lightGray: '#D3D3D3', // For borders and subtle text
    },
  },
  plugins: [],
};
