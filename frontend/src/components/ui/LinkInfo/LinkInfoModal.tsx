import axios from "axios";
import LinkStatsModal from "../LinkStats/LinkStatsModal";
import { API_BASE_URL } from "../../../constants";
import { useEffect, useState } from "react";
import type { Info, PropsInfo } from "../../../types";
import LinkStatsCloseButton from "../LinkStats/LinkStatsCloseButton";

export default function LinkInfoModal({ shortCode, onClose }: PropsInfo) {
    const [info, setInfo] = useState<Info | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/info/${shortCode}`);
                setInfo(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, [shortCode]);

    return (
        <LinkStatsModal>
            <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                <LinkStatsCloseButton onClick={onClose} />
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Информация о ссылке</h2>
                {loading ? (
                    <p className="text-gray-500">Загрузка...</p>
                ) : info ? (
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="font-medium">Оригинальная ссылка:</p>
                            <p className="text-blue-600 break-all">{info.originalUrl}</p>
                        </div>
                        <div>
                            <p className="font-medium">Создана:</p>
                            <p>{new Date(info.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="font-medium">Всего переходов:</p>
                            <p>{info.clickCount}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">Информация не найдена.</p>
                )}
            </div>
        </LinkStatsModal>
    );
}
