export type Analytics = {
    clickCount: number;
    redirects: { ip: string; timestamp: string }[];
}

export type CreateUrlPayload = {
    originalUrl: string;
    alias?: string;
    expiresAt?: string;
}

export type PropsForm = {
    onLinkCreated: () => void;
};

export type PropsList = {
    links: ShortUrl[];
    onDelete: () => void;
}

export type PropsRow = {
    link: ShortUrl;
    onDelete: (shortCode: string) => void;
    onShowStats: (shortCode: string) => void;
    onShowInfo: (shortCode: string) => void;
};

export type PropsStats = {
    shortCode: string;
    onClose: () => void;
};

export type PropsInfo = {
    shortCode: string;
    onClose: () => void;
};

export type ShortUrl = {
    id: string;
    originalUrl: string;
    shortCode: string;
    clickCount: number;
    createdAt: string;
};

export type Info = {
    originalUrl: string;
    createdAt: string;
    expiresAt?: string;
    clickCount: number;
};