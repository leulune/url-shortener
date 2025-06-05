import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import type { PropsForm } from "../types";

export default function LinkForm({ onLinkCreated }: PropsForm) {
    const [originalUrl, setOriginalUrl] = useState('');
    const [alias, setAlias] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/shorten`, {
                originalUrl,
                alias: alias.trim() || undefined,
                expiresAt: expiresAt || undefined,
            });
            setOriginalUrl('');
            setAlias('');
            setExpiresAt('');
            onLinkCreated();
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert("Алиас уже используется или недопустим");
            } else {
                alert("Ошибка при создании ссылки");
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md"
        >
            <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Введите полный URL"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
            />
            <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Уникальное имя URL (необязательно)"
                maxLength={20}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <label className="px-4 py-3 text-sm text-gray-600">
                Срок действия URL (необязательно)
            </label>
            <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Создание...' : 'Создать'}
            </button>
        </form>

    )
}