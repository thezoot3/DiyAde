export default function Header() {
    function requestFullScreen() {
        document.documentElement.requestFullscreen({ navigationUI: 'hide' })
    }
    return (
        <div className={'absolute flex w-full justify-center p-8'}>
            <span
                className={'text-2xl font-semibold'}
                onClick={requestFullScreen}
            >
                세다의 에이드 만들기
            </span>
        </div>
    )
}
