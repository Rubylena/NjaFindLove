import { useIdleTimer } from "react-idle-timer";
import { useState } from "react";

const useIdleTimeout = ({ onIdle, idleTime = 1 }: any) => {
    const [isIdle, setIdle] = useState<boolean>()
    const idleTimeout = 1000 * 60 * idleTime;
    
    const handleIdle = () => {
        setIdle(true)
        onIdle()
    }
    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        onIdle: handleIdle,
        debounce: 500
    })
    return {
        idleTimer,
        isIdle,
        setIdle
    }
}
export default useIdleTimeout;