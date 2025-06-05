export default function LinkStatsCloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
            aria-label="Закрыть"
        >
            ✕
        </button>
    );
}
