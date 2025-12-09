import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function usePageLoader() {
const [loading, setLoading] = useState(true);
const location = useLocation();

useEffect(() => {
    let frame;
    let timer;

    // Evita error de render cascada
    frame = requestAnimationFrame(() => {
    setLoading(true);

    timer = setTimeout(() => {
        setLoading(false);
    }, 500);
    });

    return () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    };
}, [location.pathname]);

return loading;
}
