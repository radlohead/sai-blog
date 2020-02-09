import React from 'react'
import { Link, Route } from 'react-router-dom'
import BoardList from '../components/Board/BoardList'
import BoardWrite from '../components/Board/BoardWrite'
import BoardView from '../components/Board/BoardView'

const Board = () => {
    return (
        <div>
            <h2>포스트</h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/board">목록</Link>
                    </li>
                    <li>
                        <Link to="/board/write">포스트 작성하기</Link>
                    </li>
                </ul>
            </nav>
            <article>
                <ul>
                    <li>
                        <Route path="/board" exact component={BoardList} />
                    </li>
                    <li>
                        <Route path="/board/write" component={BoardWrite} />
                    </li>
                    <li>
                        <Route
                            path="/board/view/:rowId"
                            component={BoardView}
                        />
                    </li>
                </ul>
            </article>
        </div>
    )
}
export default Board
