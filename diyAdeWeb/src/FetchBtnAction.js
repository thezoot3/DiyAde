import { useCallback, useEffect, useState } from 'react'

export default function useFetchBtnAction(
    pathSrc,
    maxMillisec,
    doneHandler = () => {},
) {
    const [Millisec, setInitMillisec] = useState(0)
    const [intervalMap, setIntervalMap] = useState({})
    const fetchBtn = useCallback(
        (resource) => {
            fetch(pathSrc + resource)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err))
        },
        [pathSrc],
    )
    const resetStopwatch = useCallback(() => {
        setInitMillisec(maxMillisec)
        setTimeout(() => {
            fetchBtn('/btn_activate?btn=done')
            doneHandler.call()
            setInitMillisec(0)
        }, 1500)
    }, [doneHandler, fetchBtn, maxMillisec])
    function startStopwatch(id) {
        const interval = setInterval(() => {
            if (Millisec < maxMillisec) {
                setInitMillisec((prev) => prev + 10)
            } else {
                stopStopwatch(id)
                resetStopwatch()
            }
        }, 10)
        setIntervalMap((prev) => {
            return { ...prev, [id]: interval }
        })
    }
    function stopStopwatch(id) {
        clearInterval(intervalMap[id])
    }
    function startTouch(btn) {
        return function () {
            fetchBtn('/btn_activate?btn=' + btn)
            if (btn === 'done') {
                setInitMillisec(maxMillisec)
                setTimeout(() => {
                    setInitMillisec(0)
                }, 2000)
            }
            startStopwatch(btn)
        }
    }
    function endTouch(btn) {
        return function () {
            fetchBtn('/btn_deactivate?btn=' + btn)
            stopStopwatch(btn)
        }
    }
    useEffect(() => {
        if (Millisec >= maxMillisec) {
            resetStopwatch()
        }
    }, [Millisec, maxMillisec, resetStopwatch])
    return [startTouch, endTouch, Millisec]
}
