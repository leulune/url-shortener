import axios from "axios";
import { useState } from "react";
import LinkStats from "./LinkStats";
import { API_BASE_URL } from "../constants";
import type { PropsList } from "../types";
import LinkRow from "./LinkRow";
import LinkListContainer from "./ui/LinkList/LinkListContainer";
import LinkTableWrapper from "./ui/LinkList/LinkTableWrapper";
import LinkTableHeader from "./ui/LinkList/LinkTableHeader";
import LinkInfoModal from "./ui/LinkInfo/LinkInfoModal";

export default function LinkList({ links, onDelete }: PropsList) {
    const [selectedShortCode, setSelectedShortCode] = useState<string | null>(null);
    const [selectedInfoCode, setSelectedInfoCode] = useState<string | null>(null);

    const deleteLink = async (shortCode: string) => {
        await axios.delete(`${API_BASE_URL}/delete/${shortCode}`);
        onDelete();
    };

    return (
        <LinkListContainer>
            <LinkTableWrapper>
                <LinkTableHeader />
                <tbody>
                    {links.map((link) => (
                        <LinkRow
                            key={link.id}
                            link={link}
                            onDelete={deleteLink}
                            onShowStats={setSelectedShortCode}
                            onShowInfo={setSelectedInfoCode}
                        />
                    ))}
                </tbody>
            </LinkTableWrapper>

            {selectedShortCode && (
                <LinkStats
                    shortCode={selectedShortCode}
                    onClose={() => setSelectedShortCode(null)}
                />
            )}

            {selectedInfoCode && (
                <LinkInfoModal
                    shortCode={selectedInfoCode}
                    onClose={() => setSelectedInfoCode(null)}
                />
            )}
        </LinkListContainer>
    );
}