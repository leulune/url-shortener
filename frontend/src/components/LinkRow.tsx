import { API_BASE_URL } from "../constants";
import type { PropsRow } from "../types";

export default function LinkRow({ link, onDelete, onShowStats, onShowInfo }: PropsRow) {
    const handleFollowLink = async () => {
        try {
            window.location.href = `${API_BASE_URL}/${link.shortCode}`;
        } catch (error: any) {
            alert("Ссылка устарела или недействительна");
            console.error(error);
        }
    };
    return (
        <tr className="bg-white border-b border-gray-100 hover:bg-gray-50 text-sm text-gray-700">
            <td className="p-4 break-all">{link.originalUrl}</td>
            <td className="p-4">
                <button
                    onClick={handleFollowLink}
                    className="text-blue-600 hover:underline font-medium"
                >
                    /{link.shortCode}
                </button>
            </td>
            <td className="p-4 space-y-2 flex flex-col items-start">
                <button
                    onClick={() => onDelete(link.shortCode)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1 rounded-lg"
                >
                    Удалить
                </button>
                <button
                    onClick={() => onShowInfo(link.shortCode)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1 rounded-lg"
                >
                    Информация
                </button>
                <button
                    onClick={() => onShowStats(link.shortCode)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1 rounded-lg"
                >
                    Статистика
                </button>
            </td>
        </tr>

    );
}