import { Metadata } from 'next';
import LoginForm from 'components/pages/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your account to access exclusive features.',
};

const page = () => {
  return (
    <div>
      <h3 className="tracking-wide font-light mb-6">Log in to Exclusive</h3>
      <p className="mb-12">Enter your details below</p>
      <LoginForm />
    </div>
  );
};

export default page;
