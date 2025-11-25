import Link from 'next/link';
import { Button } from '../components/Button';
import { MOCK_AVAILABILITY } from '../lib/mockData';
import { getJstNow, createJstDate } from '../lib/utils';

export default function WeeklyStatusPage() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">予約状況</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-3 text-center min-w-[100px] text-gray-900 font-semibold">日付</th>
                            <th className="border border-gray-300 p-3 text-center min-w-[100px] text-gray-900 font-semibold">午前</th>
                            <th className="border border-gray-300 p-3 text-center min-w-[100px] text-gray-900 font-semibold">午後</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_AVAILABILITY.map((day) => {
                            const dateObj = createJstDate(day.date);
                            const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
                            const dayOfWeekIndex = dateObj.getDay();
                            const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeekIndex];

                            // Logic for past check using JST
                            const now = getJstNow();
                            const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

                            const isToday = day.date === todayStr;
                            // Compare dates by resetting time to 00:00 for accurate date comparison
                            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                            const isPastDate = dateObj < todayStart;

                            const currentHour = now.getHours();

                            // AM is past if today and hour >= 12
                            const isAmPast = isPastDate || (isToday && currentHour >= 12);

                            // PM is past if today and hour >= 17
                            const isPmPast = isPastDate || (isToday && currentHour >= 17);

                            // Saturday PM closed
                            const isSatPm = dayOfWeekIndex === 6;

                            return (
                                <tr key={day.date}>
                                    <td className="border border-gray-300 p-3 text-center font-medium text-gray-900">
                                        {dateStr} ({dayOfWeek})
                                    </td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        {day.am && !isAmPast ? (
                                            <Link href={`/reservation-input?date=${day.date}&ampm=am`}>
                                                <Button size="sm">空あり</Button>
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500 font-medium">空なし</span>
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-3 text-center">
                                        {day.pm && !isPmPast && !isSatPm ? (
                                            <Link href={`/reservation-input?date=${day.date}&ampm=pm`}>
                                                <Button size="sm">空あり</Button>
                                            </Link>
                                        ) : (
                                            <span className="text-gray-500 font-medium">
                                                {isSatPm ? '休診' : '空なし'}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-sm text-gray-500">
                <p>※ 日曜日と土曜日の午後は休診です。</p>
            </div>
        </div>
    );
}
