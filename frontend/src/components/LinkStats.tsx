import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";
import type { Analytics, PropsStats } from "../types";
import LinkStatsModal from "./ui/LinkStats/LinkStatsModal";
import LinkStatsCloseButton from "./ui/LinkStats/LinkStatsCloseButton";
import LinkAnalyticsContent from "./ui/LinkStats/LinkAnalyticsContent";

export default function LinkStats({ shortCode, onClose }: PropsStats) {
    const [data, setData] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/analytics/${shortCode}`);
                setData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, [shortCode]);

    return (
        <LinkStatsModal>
            <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
                <LinkStatsCloseButton onClick={onClose} />
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Статистика переходов</h2>
                {loading ? (
                    <p className="text-gray-500">Загрузка...</p>
                ) : data ? (
                    <LinkAnalyticsContent data={data} />
                ) : (
                    <p className="text-red-500">Данные не найдены.</p>
                )}
            </div>
        </LinkStatsModal>
    );
}