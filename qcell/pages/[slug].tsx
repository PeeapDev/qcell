import { useRouter } from 'next/router';
import DynamicPage from '../components/DynamicPage';

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== 'string') {
    return <div>Loading...</div>;
  }

  return <DynamicPage slug={slug} />;
};

export default Page;
