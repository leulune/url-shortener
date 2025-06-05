import type { ReactNode } from "react";

export default function LinkTableWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-y-2">
                {children}
            </table>
        </div>
    );
}