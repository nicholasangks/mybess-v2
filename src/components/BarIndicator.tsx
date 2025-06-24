'use client';

import React from 'react';

interface BarIndicatorProps {
    percentage: number; // 0–100
}

const BarIndicator: React.FC<BarIndicatorProps> = ({ percentage }) => {
    const totalBars = 15;
    const activeBars = Math.round((percentage / 100) * totalBars);

    return (
        <div className="flex items-end gap-[4px]">
            {Array.from({ length: totalBars }).map((_, i) => (
                <div
                    key={i}
                    className={`w-[4px] h-[24px] transition-all duration-300 ${i < activeBars
                        // ? 'bg-gradient-to-t from-purple-600 to-purple-400 shadow-[0_0_3px_#a855f7]'
                        // : 'bg-purple-900 opacity-30'
                        ? 'bg-primary shadow-[0_0_3px_rgba(0,148,57,.6)]'
                        : 'bg-white/10'
                        }`}
                />
            ))}
        </div>
    );
};

export default BarIndicator;