import { getCategories } from 'actions/products';
import MainNav from './MainNav.client';

const MainNavServer = async () => {
  const categories = await getCategories();

  return (
    <>
        <MainNav categories={categories} />
    </>
  );
};

export default MainNavServer;
