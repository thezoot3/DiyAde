import useFetchBtnAction from '../FetchBtnAction'
import { useNavigate } from 'react-router'
export default function MakingAde() {
    const [startTouchHandle, endTouchHandle, progress] = useFetchBtnAction(
        '/api',
        2500,
        nextStep,
    )
    const nav = useNavigate()
    function nextStep() {
        nav('/result')
    }
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-12">
            <div className="flex w-full flex-col gap-4 pl-16">
                <span className="text-4xl font-bold">
                    당신만의 에이드를 만들어보세요!
                </span>
                <span className="text-2xl font-medium">
                    원하는 맛의 버튼을 클릭해 과일 청을 추가하세요!
                </span>
            </div>

            <div className="grid w-full grid-cols-3 gap-10 px-16">
                <button
                    className="rounded-3xl p-32 text-4xl font-bold text-black"
                    id={'lemon_btn'}
                    onTouchStart={startTouchHandle('lemon')}
                    onTouchEnd={endTouchHandle('lemon')}
                >
                    레몬
                </button>
                <button
                    className="rounded-3xl p-32 text-4xl font-bold text-black"
                    id={'grapefruit_btn'}
                    onTouchStart={startTouchHandle('grapefruit')}
                    onTouchEnd={endTouchHandle('grapefruit')}
                >
                    자몽
                </button>
                <button
                    className="rounded-3xl p-28 text-4xl font-bold text-black"
                    id={'green_grape_btn'}
                    onTouchStart={startTouchHandle('green_grape')}
                    onTouchEnd={endTouchHandle('green_grape')}
                >
                    청포도
                </button>
            </div>
            <div className="relative w-full px-16">
                <span className="absolute left-[50%] top-[10%] text-2xl font-bold text-white">
                    완료
                </span>
                <progress
                    className="h-12 w-full bg-gray-100 text-xl font-bold"
                    onTouchStart={startTouchHandle('done')}
                    onTouchEnd={endTouchHandle('done')}
                    id={'progress'}
                    max={2500}
                    value={progress}
                ></progress>
            </div>
        </div>
    )
}
