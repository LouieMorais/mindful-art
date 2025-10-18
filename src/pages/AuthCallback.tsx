// src/pages/AuthCallback.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Redirect to home page after successful authentication
        void navigate('/');
      } else {
        // Redirect to login if no session
        void navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Completing sign in...</h2>
      <p>Please wait while we redirect you.</p>
    </div>
  );
}
