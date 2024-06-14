import { useCallback } from 'react'

export default function useFetchBtnAction(pathSrc, doneHandler = () => {}) {
    const fetchBtn = useCallback(
        (resource) => {
            fetch(pathSrc + resource)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err))
        },
        [pathSrc],
    )
    function startTouch(btn) {
        return function () {
            fetchBtn('/btn_activate?btn=' + btn)
            if (btn === 'done') {
                doneHandler()
            }
        }
    }
    return [startTouch]
}
