import { Header } from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

const SubscriptionRegisterScreen = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [contractId, setContractId] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [contractNo, setContractNo] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('subscription_id, contract_no');
      if (error) {
        console.error(error);
      } else if (data) {
        setSubscriptions(data);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleContractIdChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setContractId(e.target.value);
    const { data, error } = await supabase
      .from('subscriptions')
      .select('contract_no')
      .eq('subscription_id', e.target.value)
      .single();
    if (error) {
      console.error(error);
    } else if (data) {
      setContractNo(data.contract_no || '');
    }
  };

  const handleIssueNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIssueNumber(e.target.value);
  };

  const handleIssueDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIssueDate(e.target.value);
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from('subscriptions').insert([
      {
        subscription_id: contractId, // 仮の値。本来は適切な値を設定
        contract_no: contractNo,
        start_issue_no: issueNumber,
      },
    ]);

    if (error) {
      // エラー処理
      console.error('登録失敗', error);
      // 失敗メッセージの表示など
    } else {
      // 成功時の処理
      console.log('登録成功');
      // 成功メッセージの表示、画面遷移など
      router.push('/schedule/list'); // 画面遷移
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">発行予定登録</h2>
        <div className="mb-4">
          <label htmlFor="contractId" className="block mb-2">
            契約ID
          </label>
          <input
            type="text"
            id="contractId"
            className="border rounded px-3 py-2 w-full"
            value={contractId}
            onChange={handleContractIdChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contractNo" className="block mb-2">
            契約番号
          </label>
          <input
            type="text"
            id="contractNo"
            className="border rounded px-3 py-2 w-full"
            value={contractNo}
            disabled
          />
        </div>
        <div className="mb-4">
          <label htmlFor="issueNumber" className="block mb-2">
            号数
          </label>
          <input
            type="text"
            id="issueNumber"
            className="border rounded px-3 py-2 w-full"
            value={issueNumber}
            onChange={handleIssueNumberChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="issueDate" className="block mb-2">
            発行予定日
          </label>
          <input
            type="date"
            id="issueDate"
            className="border rounded px-3 py-2 w-full"
            value={issueDate}
            onChange={handleIssueDateChange}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default SubscriptionRegisterScreen;
