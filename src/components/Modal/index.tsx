import { useRef, useEffect } from 'react';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    children: React.ReactNode;
}

export default function Modal({ open, setOpen, children }: ModalProps) {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                // Click occurred outside the modal, close it
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {open &&
                <div className="fixed top-0 left-0 w-screen h-screen bg-black/[0.4] backdrop-blur z-50">
                    <div ref={modalRef} className="absolute top-0 bottom-0 left-0 right-0 w-[90%] h-[95%] lg:h-[90%] m-auto  bg-background overflow-y-scroll overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {children}
                    </div>
                </div>
            }
        </>
    )
}