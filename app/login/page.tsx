import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { login, checkReservation } from './actions';

export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">ログイン</h2>
            <form action={login} className="space-y-6">
                <Input
                    label="診察券番号"
                    name="cardNo"
                    placeholder="12345"
                    required
                />
                <Input
                    label="生年月日"
                    name="birthDate"
                    type="date"
                    required
                />

                <div className="space-y-4 pt-4">
                    <Button type="submit" className="w-full">
                        次へ
                    </Button>

                    <Button
                        type="submit"
                        formAction={checkReservation}
                        variant="outline"
                        className="w-full"
                    >
                        予約確認・予約取消
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full"
                        disabled
                    >
                        初めての方へ
                    </Button>
                </div>
            </form>
        </div>
    );
}
