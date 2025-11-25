export const MOCK_PATIENT = {
    cardNo: '12345',
    birthDate: '1990-01-01',
    name: '山田 太郎',
};

export type TimeSlot = {
    time: string;
    available: boolean;
};

export const MOCK_AVAILABILITY = [
    { date: '2025-11-25', am: true, pm: false }, // Today (Mon)
    { date: '2025-11-26', am: true, pm: true },  // Tue
    { date: '2025-11-27', am: false, pm: true }, // Wed
    { date: '2025-11-28', am: true, pm: true },  // Thu
    { date: '2025-11-29', am: true, pm: true },  // Fri
];

export const MOCK_TIME_SLOTS_AM: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '09:15', available: false },
    { time: '09:30', available: true },
    { time: '09:45', available: true },
    { time: '10:00', available: false },
    { time: '10:15', available: true },
    { time: '10:30', available: true },
    { time: '10:45', available: true },
    { time: '11:00', available: true },
    { time: '11:15', available: false },
    { time: '11:30', available: true },
    { time: '11:45', available: true },
];

export const MOCK_TIME_SLOTS_PM: TimeSlot[] = [
    { time: '14:00', available: true },
    { time: '14:15', available: true },
    { time: '14:30', available: false },
    { time: '14:45', available: true },
    { time: '15:00', available: true },
    { time: '15:15', available: true },
    { time: '15:30', available: false },
    { time: '15:45', available: true },
    { time: '16:00', available: true },
    { time: '16:15', available: true },
    { time: '16:30', available: true },
    { time: '16:45', available: false },
];
