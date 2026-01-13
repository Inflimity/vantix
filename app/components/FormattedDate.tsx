"use client";

import { useEffect, useState } from "react";

interface FormattedDateProps {
    date: Date | string | number;
    showTime?: boolean;
}

export default function FormattedDate({ date, showTime = true }: FormattedDateProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder or the ISO string to avoid hydration mismatch
        // Rendering nothing or a non-date string is safest for hydration
        return <span className="opacity-0">...</span>;
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return <span>Invalid Date</span>;
    }

    return (
        <span>
            {showTime ? d.toLocaleString() : d.toLocaleDateString()}
        </span>
    );
}
