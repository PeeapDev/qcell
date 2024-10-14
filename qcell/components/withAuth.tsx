import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          await axios.get('/api/user');
        } catch (err) {
          router.push('/login');
        }
      };
      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
