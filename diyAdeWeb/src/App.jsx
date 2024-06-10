
import FetchBtnAction from "./FetchBtnAction";
export default function App() {
    const [startTouchHandle, endTouchHandle] = FetchBtnAction('localhost');
    const requestFullScreen = () => {
        document.documentElement.requestFullscreen();
    }
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full grid grid-cols-3 gap-10 px-16 mb-12">
        <button className="text-black text-3xl font-bold rounded-3xl" id={"lemon_btn"} onTouchStart={startTouchHandle('lemon')} onTouchEnd={endTouchHandle('lemon')}>
            레몬
        </button>
        <button className="text-black text-3xl font-bold p-24 rounded-3xl" id={"grapefruit_btn"} onTouchStart={startTouchHandle('grapefruit')} onTouchEnd={endTouchHandle('grapefruit')}>
          자몽
        </button>
        <button className="text-black text-3xl font-bold p-24 rounded-3xl" id={"green_grape_btn"} onTouchStart={startTouchHandle('green_grape')} onTouchEnd={endTouchHandle('green_grape')}>
          청포도
        </button>
      </div>
        <div className={'w-full px-16 grid grid-cols-2 gap-12'}>
            <button className="bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-6 rounded-3xl w-full" onClick={requestFullScreen}>
                정지
            </button>
            <button className="bg-slate-400 hover:bg-slate-500 text-white text-xl font-bold py-6 rounded-3xl w-full">
                완료
            </button>
        </div>
    </div>
  );
}
