import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { BsExclamationTriangleFill } from 'react-icons/bs';

import { supabase } from '@/supabase';

const AlertNotificationSetting = () => {
  const router = useRouter();
  const [notificationSettings, setNotificationSettings] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    notification_type: 'email',
    notification_destination: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('alert_notification_settings')
        .select('setting_id, notification_type, notification_destination')
        .single();

      if (error) {
        setErrorMessage('アラート通知設定の取得に失敗しました。');
        setNotificationSettings({
          setting_id: '1',
          notification_type: 'email',
          notification_destination: 'test@example.com',
        }); // サンプルデータ
      } else {
        setNotificationSettings(data);
        setFormValues({
          notification_type: data.notification_type,
          notification_destination: data.notification_destination,
        });
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const { error } = await supabase
      .from('alert_notification_settings')
      .upsert(formValues);

    if (error) {
      setErrorMessage('アラート通知設定の保存に失敗しました。');
    } else {
      // 成功時の処理
      alert('保存しました。');
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100 flex flex-col">
      <div>Header</div>  {/* ヘッダー */}
      <main className="flex-grow p-4">
      <h2 className="text-2xl font-bold mb-4">アラート通知先設定</h2>
        {errorMessage && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline"><BsExclamationTriangleFill className="inline mr-1" /> {errorMessage}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="notification_type" className="block text-gray-700 text-sm font-bold mb-2">通知タイプ:</label>
            <select
              id="notification_type"
              name="notification_type"
              value={formValues.notification_type}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="email">メール</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="notification_destination" className="block text-gray-700 text-sm font-bold mb-2">
              通知先:
            </label>
            <input
              type="text"
              id="notification_destination"
              name="notification_destination"
              value={formValues.notification_destination}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="メールアドレスを入力してください"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              保存
            </button>
          </div>
        </form>
      </main>
      <div>Footer</div> {/* フッター */}
    </div>
  );
};

export default AlertNotificationSetting;
