import SignupForm from "components/pages/auth/SignupForm"

const page = () => {
  return (
    <div>
      <h3 className='tracking-wide font-light mb-6'>Create an account</h3>
      <p className="mb-12">Enter your details below</p>
      <SignupForm />
    </div>
  )
}

export default page