export default function FetchBtnAction(pathSrc) {
    function fetchBtn(resource) {
        fetch(pathSrc + resource)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }
    function startTouch(btn) {
        return function() {
            fetchBtn('/btn_activate?btn=' + btn)
        }
    }
    function endTouch(btn) {
        return function() {
            fetchBtn('/btn_deactivate?btn=' + btn)
        }
    }
    return [startTouch, endTouch]
}
