'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './Button';
import { useEffect, useState } from 'react';

type User = {
    name: string;
    cardNo: string;
};

export function Header({ user }: { user: User | null }) {
    const pathname = usePathname();
    const router = useRouter();

    // Don't show back button on login or completion pages
    const showBackButton = pathname !== '/login' && pathname !== '/reservation-complete' && pathname !== '/';

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {showBackButton && (
                        <Button variant="outline" size="sm" onClick={() => router.back()}>
                            戻る
                        </Button>
                    )}
                    <h1 className="text-xl font-bold text-blue-600">AKClinic</h1>
                </div>

                {user && (
                    <div className="text-sm text-right">
                        <p className="font-medium text-gray-900">{user.name} 様</p>
                        <p className="text-gray-500">No. {user.cardNo}</p>
                    </div>
                )}
            </div>
        </header>
    );
}
