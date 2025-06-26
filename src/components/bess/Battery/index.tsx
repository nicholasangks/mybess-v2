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
        backgroundColor = 'bg-critical'; // Fill with red if percentage is less than 50%
    } else {
        backgroundColor = 'bg-accent-a'; // Fill with green otherwise
    }

    return (
        <div className={`w-full h-auto p-1 bg-secondary text-center${percentage < 50 ? ' border border-red-300 bg-red-200' : ''}`}>
            <div className={`flex items-center justify-center h-6 bg-background text-center${percentage < 50 ? ' bg-red-400 text-white' : ''}`}>
                {voltage} V
            </div>
            <div className="pt-4">
                <div>
                    <div className="grid grid-cols-5 gap-0.5 w-[55%] lg:w-[45%] h-[0.8rem] lg:h-[1rem] mx-auto border border-border">
                        {[...Array(filledCells)].map((_, index) => (
                            <div key={index} className={`h-full ${backgroundColor}`}></div>
                        ))}
                        {[...Array(remainingCells)].map((_, index) => (
                            <div key={index} className="h-full bg-muted"></div>
                        ))}
                    </div>
                    <div className="mt-2 text-muted-foreground text-sm lg:mt-3">
                        {temperature} °C
                    </div>
                </div>
            </div>
        </div>
    )
}