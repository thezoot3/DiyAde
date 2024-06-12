import { Link } from 'react-router-dom'
import { animated, useSpring } from '@react-spring/web'

export default function ResultPage() {
    const spring = useSpring({
        from: {
            width: '20%',
        },
        to: {
            width: '100%',
        },
    })
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <div className="flex w-full flex-col content-center gap-10 px-20">
                <span className="text-5xl font-bold text-black">
                    당신만의 에이드가 완성되었어요!!
                </span>
                <span className="text-3xl font-semibold text-black">
                    맛있게 드세요 🥤🍹
                </span>
                <Link to="/">
                    <animated.div
                        className="bg-indigo-600 p-3 text-3xl font-semibold text-white"
                        style={spring}
                    >
                        돌아가기
                    </animated.div>
                </Link>
            </div>
        </div>
    )
}
