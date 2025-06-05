import type { Info } from "../../../types";

export default function LinkInfoContent({ info }: { info: Info }) {
    return (
        <div className="space-y-4 text-sm">
            <div>
                <p className="font-medium text-gray-700">Оригинал:</p>
                <p className="text-blue-600 break-all">{info.originalUrl}</p>
            </div>
            <div>
                <p className="font-medium text-gray-700">Создано:</p>
                <p>{new Date(info.createdAt).toLocaleString()}</p>
            </div>
            <div>
                <p className="font-medium text-gray-700">Переходов:</p>
                <p>{info.clickCount}</p>
            </div>
        </div>
    );
}