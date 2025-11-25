import Link from 'next/link';
import { MOCK_TIME_SLOTS_AM, MOCK_TIME_SLOTS_PM } from '../lib/mockData';
import { getJstNow, createJstDate } from '../lib/utils';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ReservationInputPage({ searchParams }: Props) {
    const params = await searchParams;
    const date = params.date as string;
    const ampm = params.ampm as string;

    if (!date || !ampm) {
        return <div>Invalid parameters</div>;
    }

    const dateObj = createJstDate(date);
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][dateObj.getDay()];
    const dateStr = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日 (${dayOfWeek})`;
    const timeSlots = ampm === 'am' ? MOCK_TIME_SLOTS_AM : MOCK_TIME_SLOTS_PM;
    const periodStr = ampm === 'am' ? '午前' : '午後';

    const now = getJstNow();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
                予約時間選択
            </h2>
            <p className="text-center mb-6 text-lg font-bold text-gray-900">
                {dateStr} {periodStr}
            </p>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-3 text-center w-1/2 text-gray-900 font-semibold">時間</th>
                            <th className="border border-gray-300 p-3 text-center w-1/2 text-gray-900 font-semibold">状況</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((slot) => {
                            const slotDate = createJstDate(date, slot.time);

                            const isPast = slotDate < now;
                            const isAvailable = slot.available && !isPast;

                            return (
                                <tr key={slot.time}>
                                    <td className="border border-gray-300 p-3 text-center font-medium text-gray-900">
                                        {slot.time}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        {isAvailable ? (
                                            <Link
                                                href={`/reservation-confirm?date=${date}&time=${slot.time}`}
                                                className="inline-block text-2xl text-blue-600 hover:text-blue-800 font-bold no-underline"
                                            >
                                                〇
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500 font-bold">×</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
