import Link from 'next/link';
import { Button } from '../components/Button';
import { getSession } from '../lib/auth';
import { createJstDate } from '../lib/utils';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ReservationConfirmPage({ searchParams }: Props) {
    const params = await searchParams;
    const date = params.date as string;
    const time = params.time as string;
    const mode = params.mode as string;
    const session = await getSession();

    if (!session) {
        return <div>Session expired</div>;
    }

    const dateObj = createJstDate(date);
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][dateObj.getDay()];
    const dateStr = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日 (${dayOfWeek})`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
                {mode === 'check' ? '予約確認・取消' : '予約確認'}
            </h2>

            <div className="space-y-4 mb-8">
                <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm text-gray-700 font-medium">診察券番号</p>
                    <p className="font-medium text-lg text-gray-900">{session.cardNo as string}</p>
                </div>
                <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm text-gray-700 font-medium">氏名</p>
                    <p className="font-medium text-lg text-gray-900">{session.name as string}</p>
                </div>
                <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm text-gray-700 font-medium">生年月日</p>
                    <p className="font-medium text-lg text-gray-900">{session.birthDate as string}</p>
                </div>
                <div className="border-b border-gray-300 pb-2">
                    <p className="text-sm text-gray-700 font-medium">予約日時</p>
                    <p className="font-bold text-lg text-blue-700">
                        {dateStr} {time}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                {mode === 'check' ? (
                    <Link href="/reservation-complete?status=cancelled" className="w-full">
                        <Button variant="danger" className="w-full">取消</Button>
                    </Link>
                ) : (
                    <Link href="/reservation-complete" className="w-full">
                        <Button className="w-full">OK</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
