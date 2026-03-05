"use client";

import { useState } from "react";
import { updateTransactionStatus } from "@/actions/admin";
import { toast } from "sonner"; // Assuming sonner is used for toasts, if not I'll adjust

interface AdminActionButtonProps {
    transactionId: string;
    status: "APPROVED" | "REJECTED";
    label: string;
    className?: string;
}

export default function AdminActionButton({ transactionId, status, label, className }: AdminActionButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async () => {
        setIsLoading(true);
        try {
            const result = await updateTransactionStatus(transactionId, status);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.success);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleAction}
            disabled={isLoading}
            className={`${className} flex items-center justify-center min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                label
            )}
        </button>
    );
}
