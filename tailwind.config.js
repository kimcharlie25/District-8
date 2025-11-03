/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf9',
          100: '#c5d3f0',
          200: '#9eb6e6',
          300: '#7799dc',
          400: '#5a82d4',
          500: '#3d6bcc',
          600: '#1d419d',
          700: '#17348c',
          800: '#12277a',
          900: '#0d1a56',
        },
        // Keep old colors for admin/backward compatibility
        ramen: {
          red: '#D7263D',
          dark: '#0B0A0A',
          charcoal: '#111113',
          cream: '#FFF3E0',
          beige: '#F7E7CE',
          gold: '#E0A106',
          sesame: '#D1C7B7',
          seaweed: '#1F2937',
          kimchi: '#B81D24'
        }
      },
      fontFamily: {
        'heading': ['Horizon', 'Impact', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        // Keep old fonts for admin
        'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
        'noto-kr': ['Noto Serif KR', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(29, 65, 157, 0.2), 0 0 10px rgba(29, 65, 157, 0.1)' },
          '100%': { boxShadow: '0 0 10px rgba(29, 65, 157, 0.4), 0 0 20px rgba(29, 65, 157, 0.2)' }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1d419d 0%, #3d6bcc 100%)',
        'gradient-primary-soft': 'linear-gradient(135deg, #e8edf9 0%, #c5d3f0 100%)',
      }
    },
  },
  plugins: [],
};