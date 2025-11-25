'use server';

import { redirect } from 'next/navigation';
import { createSession } from '../lib/auth';
import { MOCK_PATIENT } from '../lib/mockData';

export async function login(formData: FormData) {
    const cardNo = formData.get('cardNo');
    const birthDate = formData.get('birthDate');

    // Demo: Accept any input, but use mock data for session
    // In a real app, we would validate against DB

    await createSession({
        ...MOCK_PATIENT,
        // Override with input if we wanted to reflect what was typed, 
        // but requirements say "inherit from login screen" and "fixed name for demo".
        // So we'll just store the fixed mock patient data + the input cardNo/birthDate if needed.
        // For now, just using MOCK_PATIENT is fine as per "Name (eventually from DB, fixed for demo)".
        cardNo: cardNo as string,
        birthDate: birthDate as string,
    });

    redirect('/weekly-status');
}

export async function checkReservation(formData: FormData) {
    const cardNo = formData.get('cardNo');
    const birthDate = formData.get('birthDate');

    await createSession({
        ...MOCK_PATIENT,
        cardNo: cardNo as string,
        birthDate: birthDate as string,
    });

    // Redirect to confirmation with dummy reservation data for demo
    redirect('/reservation-confirm?date=2025-11-26&time=10:00&mode=check');
}
