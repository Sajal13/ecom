import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import Button from 'components/base/Buttons';

const ThemeTogglerButton = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeToggle = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };
  return (
    <Button size="small" shape="circle" color="secondary" onClick={handleThemeToggle}>
      <span className="text-xl">{theme === 'dark' ? <FaMoon /> : <FaSun />}</span>
    </Button>
  );
};

export default ThemeTogglerButton;
