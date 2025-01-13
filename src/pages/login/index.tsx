import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: userId,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        router.push('/menu');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('ログインに失敗しました。');
    }
  };

  const handleOAuthLogin = async (provider: string) => {
      try {
        const { error } = await supabase.auth.signInWithOAuth({ provider });
        if (error) {
          setErrorMessage(error.message);
        } else {
          router.push('/menu');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('ログインに失敗しました。');
      }
  }

  return (
    <div className="min-h-screen h-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">ログイン</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="ユーザーID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          aria-label="ユーザーID"
        />
        <input
          type="password"
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="パスワード"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
          onClick={handleLogin}
        >
          ログイン
        </button>
        <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded w-full"
          onClick={() => handleOAuthLogin('google')}>
          <FcGoogle className="mr-2 text-lg" />
          Googleでログイン
        </button>
      </div>
    </div>
  );
};

export default Login;
