import axios from "axios";
import { useCallback } from "react";
import { API_BASE_URL } from "../constants";
import type { ShortUrl } from "../types";

export const useFetchLinks = (setLinks: (links: ShortUrl[]) => void) => {
    return useCallback(async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/links`);
            if (Array.isArray(res.data)) {
                setLinks(res.data);
            } else {
                console.warn("Unexpected response:", res.data);
                setLinks([]);
            }
        } catch (error) {
            console.error(error);
            setLinks([]);
        }
    }, [setLinks]);
};