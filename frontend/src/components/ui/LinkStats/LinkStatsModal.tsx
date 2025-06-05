import type { ReactNode } from "react";

export default function LinkStatsModal({ children }: { children: ReactNode }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            {children}
        </div>
    );
}