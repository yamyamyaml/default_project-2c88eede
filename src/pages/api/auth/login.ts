import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase-server';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'メールアドレスとパスワードは必須です。' });
    }

    try {
      const { error, session } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase login error:', error);
        return res.status(500).json({ error: 'ログインに失敗しました。' });
      }

      if (session && session.access_token) {
        return res.status(200).json({ token: session.access_token });
      } else {
        console.error('Supabase login error: No access token returned.');
        return res.status(500).json({ error: 'ログインに失敗しました。' });
      }
    } catch (error) {
      console.error('Internal server error:', error);
      return res.status(500).json({ error: 'ログインに失敗しました。' });
    }
  } else {
    return res.status(405).json({ error: '許可されていないメソッドです。' });
  }
};

export default handler;