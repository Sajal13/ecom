import Image from 'next/image';
import Image1 from 'assets/images/illustration/1.webp';

const OurStory = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-6 md:gap-10 lg:gap-20">
      <div className='lg:order-1'>
        <Image
          src={Image1}
          alt=""
          width={700}
          height={600}
          className='rounded-sm'
        />
      </div>
      <div>
        <h1 className="font-semibold mb-6 md:mb-10 tracking-wide">Our Story</h1>
        <p className="mb-4 md:mb-6 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
          minima sint iste maiores asperiores dignissimos inventore id vel,
          incidunt hic necessitatibus unde reprehenderit suscipit officiis et
          sapiente aut eveniet deserunt. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Esse quam similique natus vero doloribus, optio
          totam distinctio quod officiis quasi repudiandae ducimus, expedita
          voluptatem enim placeat aperiam earum est ipsa.
        </p>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum,
          distinctio adipisci eligendi ratione reprehenderit temporibus quia,
          laboriosam nobis tempora quod totam ipsa minima doloribus culpa
          suscipit? Consequatur, fugiat magni?
        </p>
      </div>
    </section>
  );
};

export default OurStory;
