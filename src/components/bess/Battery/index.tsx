interface BatteryProps {
    voltage: number;
    temperature: number;
    percentage?: number;
}

// temperature and percentage are not used in the component
let percentage = 100;

export default function Battery({ voltage, temperature }: BatteryProps) {
    const filledCells = Math.floor(percentage / 20);
    const remainingCells = 5 - filledCells;

    let backgroundColor: string;
    if (percentage < 50) {
        backgroundColor = 'bg-red-400'; // Fill with red if percentage is less than 50%
    } else {
        backgroundColor = 'bg-color-third dark:bg-color-third-dark'; // Fill with green otherwise
    }

    return (
        // <div className={`w-full h-auto aspect-square p-1 bg-color-primary text-center${percentage < 50 ? ' border border-red-300 bg-red-200' : ''}`}>
        <div className={`w-full h-auto p-1 bg-color-primary dark:bg-color-primary-dark text-center${percentage < 50 ? ' border border-red-300 bg-red-200' : ''}`}>
            <div className={`flex items-center justify-center h-6 bg-white dark:bg-color-second-dark text-center${percentage < 50 ? ' bg-red-400 text-white' : ''}`}>
                {voltage} v
            </div>
            <div className="pt-4">
                <div>
                    <div className="grid grid-cols-5 gap-0.5 w-[55%] lg:w-[45%] h-[0.8rem] lg:h-[1rem] mx-auto border border-color-border dark:border-color-border-dark">
                        {[...Array(filledCells)].map((_, index) => (
                            <div key={index} className={`h-full ${backgroundColor}`}></div>
                        ))}
                        {[...Array(remainingCells)].map((_, index) => (
                            <div key={index} className="h-full bg-gray-300"></div>
                        ))}
                    </div>
                    <div className="mt-2 lg:mt-3">
                        {temperature}
                    </div>
                </div>
            </div>
        </div>
    )
}