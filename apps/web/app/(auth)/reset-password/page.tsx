import { Metadata } from 'next';
import ResetPassword from 'components/pages/auth/ResetPassword';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your account password using OTP',
};

const page = () => {
  return (
    <div className="max-w-92">
      <h3 className="tracking-wide font-light mb-6">Reset Password</h3>
      <p className="mb-12">Enter new password and OTP to reset your password.</p>
      <ResetPassword />
    </div>
  );
};

export default page;
