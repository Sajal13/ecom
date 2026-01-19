import Link from 'next/link';
import Button from 'components/base/Buttons';

const NotFound = () => {
  return (
    <div className=" container px-6 h-screen flex justify-center items-center">
      <div className="text-center flex flex-col justify-center items-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl mb-6 md:mb-8 lg:mb-10 sm:tracking-wide">
          404 Not Found
        </h1>
        <p className="mb-6 md:mb-8 lg:mb-10">
          Your visited page not found. You may go home page.
        </p>

        <Link href="/">
          <Button variant="filled" color="danger">
            Back to home page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
