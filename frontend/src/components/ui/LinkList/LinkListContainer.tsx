import type { ReactNode } from "react";

export default function LinkListContainer({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Сокращённые ссылки</h2>
            {children}
        </div>
    );
}
