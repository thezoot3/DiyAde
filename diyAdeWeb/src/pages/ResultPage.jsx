import { Link } from 'react-router-dom'
import { animated, useSpring } from '@react-spring/web'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Typewriter from 'typewriter-effect'

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
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(60)
                                .typeString('당신만의 에이드가 완성되었어요!!')
                                .start()
                        }}
                    />
                </span>
                <span className="text-3xl font-semibold text-black">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(80)
                                .typeString('맛있게 드세요 🥤🍹')
                                .pauseFor(1500)
                                .deleteAll()
                                .typeString(
                                    '플라스틱 컵은 씻어서 재활용 해주세요!',
                                )
                                .start()
                        }}
                    ></Typewriter>
                </span>
                <Link to="/">
                    <animated.div
                        className="flex w-full items-center justify-between bg-indigo-600 px-7 py-4 text-3xl font-semibold text-white"
                        style={spring}
                    >
                        <span className="text-3xl font-semibold text-white">
                            돌아가기
                        </span>
                        <ArrowRightIcon className="size-8 stroke-2" />
                    </animated.div>
                </Link>
            </div>
        </div>
    )
}
