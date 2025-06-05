import type { Analytics } from "../../../types";
import { normalizeIp } from "../../../utils/normalizeIp";

export default function LinkAnalyticsContent({ data }: { data: Analytics }) {
    return (
        <div className="space-y-4 text-sm">
            <div>
                <p className="font-medium">Всего переходов:</p>
                <p>{data.clickCount}</p>
            </div>
            <div>
                <p className="font-medium">Последние IP-адреса:</p>
                {data.redirects.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                        {data.redirects.map((entry, index) => (
                            <li key={index}>
                                {normalizeIp(entry.ip)} —{" "}
                                <span className="text-gray-500">
                                    {new Date(entry.timestamp).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic">Нет данных</p>
                )}
            </div>
        </div>
    );
}
