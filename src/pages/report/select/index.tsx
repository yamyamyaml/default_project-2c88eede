import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Components
export const ReportSelect = () => {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState('');

  const handleNext = () => {
    switch (selectedReport) {
      case '契約者一覧表':
        router.push('/report/subscriber_list');
        break;
      case '売上一覧表':
        router.push('/report/sales_list');
        break;
      case '入金集計表':
        router.push('/report/payment_summary');
        break;
      case 'ラベル':
        router.push('/report/label');
        break;
      case '発送データ':
        router.push('/report/shipping_data');
        break;
      case '定期元帳':
        router.push('/report/periodic_ledger');
        break;
      default:
        // Handle no selection
        break;
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">レポート種別選択</h2>
      <div className="flex flex-col items-start space-y-2">
        <label>
          <input
            type="radio"
            name="report"
            value="契約者一覧表"
            checked={selectedReport === '契約者一覧表'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          契約者一覧表
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="売上一覧表"
            checked={selectedReport === '売上一覧表'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          売上一覧表
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="入金集計表"
            checked={selectedReport === '入金集計表'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          入金集計表
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="ラベル"
            checked={selectedReport === 'ラベル'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          ラベル
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="発送データ"
            checked={selectedReport === '発送データ'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          発送データ
        </label>
        <label>
          <input
            type="radio"
            name="report"
            value="定期元帳"
            checked={selectedReport === '定期元帳'}
            onChange={(e) => setSelectedReport(e.target.value)}
          />
          定期元帳
        </label>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleNext}
        disabled={!selectedReport}
      >
        次へ
      </button>
    </div>
  );
};