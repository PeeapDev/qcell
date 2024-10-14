import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function VerifyEmail() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id, hash } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      if (id && hash) {
        try {
          await axios.get(`/api/verify-email/${id}/${hash}`);
          setVerified(true);
        } catch (err) {
          setError('Invalid or expired verification link');
        }
      }
    };
    verifyEmail();
  }, [id, hash]);

  if (verified) {
    return <div>Email verified successfully. You can now log in.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Verifying your email...</div>;
}
