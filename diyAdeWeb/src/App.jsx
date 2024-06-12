import ResultPage from './pages/ResultPage'
import MakingAde from './pages/MakingAde'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'

export default function App() {
    return (
        <div className={'relative'}>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path={'/'} element={<MakingAde />} />
                    <Route path={'/result'} element={<ResultPage />} />
                </Routes>
            </HashRouter>
        </div>
    )
}
