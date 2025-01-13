{"code": "import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/reports/generate_label';
import { jest } from '@jest/globals';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

describe('ラベルデータ出力API', () => {
  it('正常系：ラベルデータが正常に出力される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: { /* 出力条件 */ },
    });

    // モックレスポンスの設定
    mockedAxios.post.mockResolvedValueOnce({ data: 'ラベルデータ' });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe('ラベルデータ');
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('異常系：出力条件が不正な場合、エラーレスポンスが返される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: { /* 不正な出力条件 */ },
    });

    // モックレスポンスの設定
    mockedAxios.post.mockRejectedValueOnce({ message: '不正な出力条件です', status: 400 });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getData()).toEqual({ message: '不正な出力条件です' }); // MockResponse の _getData() の型定義を修正
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('異常系：データベースエラーが発生した場合、エラーレスポンスが返される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: { /* 出力条件 */ },
    });

    mockedAxios.post.mockRejectedValueOnce({ message: 'データベースエラー', status: 500 });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toEqual({ message: 'データベースエラー' });
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it('異常系：予期せぬエラーが発生した場合、エラーレスポンスが返される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: { /* 出力条件 */ },
    });

    mockedAxios.post.mockRejectedValueOnce({ message: '予期せぬエラー', status: 500 });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toEqual({ message: '予期せぬエラー' });
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
"}