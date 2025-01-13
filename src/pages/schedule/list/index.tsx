import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SupabaseClient } from '@supabase/supabase-js';
import supabase from '@/supabase';
import Link from 'next/link';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface Schedule {
  subscription_id: number;
  contract_no: string;
  product_name: string;
  schedule_id: number;
  issue_no: string;
  scheduled_date: string;
  actual_date: string | null;
}

const ScheduleList: React.FC = () => {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data, error } = await supabase
          .from('schedule')
          .select('schedule_id, issue_no, scheduled_date, actual_date, subscriptions(subscription_id, contract_no), products(product_name)')
          .order('scheduled_date');
        if (error) {
          console.error('Error fetching schedules:', error);
          setSchedules([
            { subscription_id: 1, contract_no: 'CNTRCT-001', product_name: 'Product A', schedule_id: 1, issue_no: 'ISSUE-001', scheduled_date: '2024-05-01', actual_date: null },
            { subscription_id: 2, contract_no: 'CNTRCT-002', product_name: 'Product B', schedule_id: 2, issue_no: 'ISSUE-002', scheduled_date: '2024-05-15', actual_date: '2024-05-14' },
          ]);
        } else {
          setSchedules(
            data.map((item) => ({
              subscription_id: item.subscriptions.subscription_id,
              contract_no: item.subscriptions.contract_no,
              product_name: item.products.product_name,
              schedule_id: item.schedule_id,
              issue_no: item.issue_no,
              scheduled_date: item.scheduled_date,
              actual_date: item.actual_date,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
        setSchedules([
          { subscription_id: 1, contract_no: 'CNTRCT-001', product_name: 'Product A', schedule_id: 1, issue_no: 'ISSUE-001', scheduled_date: '2024-05-01', actual_date: null },
          { subscription_id: 2, contract_no: 'CNTRCT-002', product_name: 'Product B', schedule_id: 2, issue_no: 'ISSUE-002', scheduled_date: '2024-05-15', actual_date: '2024-05-14' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
        <h2 className="text-2xl font-bold">発行スケジュール一覧</h2>
        <button
          type="button"
          onClick={() => router.push('/schedule/register')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          <IoMdAddCircleOutline className="inline-block mr-2" /> 発行予定登録
        </button>
        <Link href="/schedule/unissued" className="ml-4 text-blue-500 underline">未発行一覧</Link>
        <table className="min-w-full mt-8">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">契約番号</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品名</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">発行番号</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">発行予定日</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">発行実績日</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.schedule_id} className="bg-white border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule.contract_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.product_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.issue_no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.scheduled_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.actual_date || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button onClick={() => router.push(`/schedule/${schedule.schedule_id}`)} className="text-blue-500 hover:text-blue-700">詳細</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleList;
