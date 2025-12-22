import ForgotPasswordForm from 'components/pages/auth/ForgotPasswordForm';

const page = () => {
  return (
    <div className='max-w-md'>
      <h3 className="tracking-wide font-light mb-6">Password Reset</h3>
      <p className="mb-12">
        Provide the email or phone number associated with your account to recover your password.
      </p>
      <ForgotPasswordForm />
    </div>
  );
};

export default page;
