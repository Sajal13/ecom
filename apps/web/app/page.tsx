'use client';

import { useTheme } from 'next-themes';
import Button from 'components/base/Buttons';
import FloatingInput from 'components/base/FloatingInput';
import TextField from 'components/base/TextField';

const Home = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div>
      <p className="text-red-500">Hello there</p>
      <h1 className="font-roboto">Hello there</h1>
      <Button variant="text" onClick={handleThemeChange}>
        {' '}
        toggleTheme
      </Button>
      <FloatingInput
        label="Email Address"
        size="medium"
        error={false}
        helperText="We'll never share your email."
      />
      <TextField />
    </div>
  );
};

export default Home;
