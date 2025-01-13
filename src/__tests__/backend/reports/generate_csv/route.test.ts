{"code": "import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/reports/generate_csv';
import { jest } from '@jest/globals';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

describe('API Route Test', () => {
  it('should return CSV data with status 200', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: {
        reportType: '契約者一覧',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain('顧客ID,顧客名'); // CSVデータの内容を検証
    expect(res.getHeaders()['content-type']).toBe('text/csv');
    expect(res.getHeaders()['content-disposition']).toContain('attachment; filename=\"report.csv\"');
  });

  it('should return 400 if reportType is invalid', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: {
        reportType: '不正なレポートタイプ',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toBe('Invalid report type');
  });

    it('should return 400 if required parameters are missing', async () => {
      const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
        method: 'GET',
        query: {}, // パラメータなし
      });
  
      await handler(req, res);
  
      expect(res._getStatusCode()).toBe(400);
      expect(res._getData()).toBe('Missing required parameters');
    });
  
    it('should handle invalid date format', async () => {
      const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
        method: 'GET',
        query: {
          reportType: '契約者一覧',
          startDate: 'invalid date',
          endDate: '2024-12-31'
        },
      });
  
      await handler(req, res);
  
      expect(res._getStatusCode()).toBe(400);
      expect(res._getData()).toBe('Invalid date format');
    });
  
});
"}