import { Button } from '../components/Button';
import { logout } from './actions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ReservationCompletePage({ searchParams }: Props) {
    const params = await searchParams;
    const isCancelled = params.status === 'cancelled';

    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="mb-6 flex justify-center">
                <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center",
                    isCancelled ? "bg-red-100" : "bg-green-100"
                )}>
                    {isCancelled ? (
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {isCancelled ? '予約取消完了' : '予約完了'}
            </h2>
            <p className="text-gray-600 mb-8">
                {isCancelled ? (
                    <>
                        予約の取り消しが完了しました。<br />
                        またのご利用をお待ちしております。
                    </>
                ) : (
                    <>
                        診療予約が完了しました。<br />
                        ご来院をお待ちしております。
                    </>
                )}
            </p>

            <form action={logout}>
                <Button type="submit" variant="primary" className="w-full">
                    ログイン画面に戻る
                </Button>
            </form>
        </div>
    );
}
