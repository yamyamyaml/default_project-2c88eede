import { useRouter } from 'next/navigation';
import { useState } from 'react';

// components
const Header = () => <div>Header</div>;
const Footer = () => <div>Footer</div>;

const AlertSetting: React.FC = () => {
  const router = useRouter();

  const handleAlertConditionClick = () => {
    router.push('/alertConditionSetting');
  };

  const handleAlertNotificationClick = () => {
    router.push('/alertNotificationSetting');
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">アラート設定</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleAlertConditionClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              アラート条件設定
            </button>
            <button
              onClick={handleAlertNotificationClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              アラート通知先設定
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlertSetting;