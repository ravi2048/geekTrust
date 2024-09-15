import { useContext } from "react"
import { TableContext } from "../App"
import './styles.css';

interface Props {
    checkAllFlag: React.MutableRefObject<boolean>
}
const Pagination = ({checkAllFlag}: Props) => {
    const {page, setPage, data, setData, pageSize} = useContext(TableContext);
    let noOfPages = Math.ceil((data.length)/pageSize);
    const pList = new Array(noOfPages).fill(0);

    function handleClick(currPage: number) {
        setPage(currPage);
    }

    function handleDeleteSelected() {
        const newD = data.filter((item, _) => !item.checked);
        // switch page if all rows are deleted
        const currPageSize = (page === noOfPages) ? data.length-(page-1) * pageSize : pageSize;
        if(data.length - newD.length === currPageSize) {
            if(page === noOfPages) {
                setPage(page-1);
            }
        }
        setData(newD);
        checkAllFlag.current = false;
    }

    return(
        <div className="pagination-container">
            <div className="delete-selected">
                <button onClick={handleDeleteSelected}>Delete Selected</button>
            </div>
            <div className="pagination">
                <button className="first-page" onClick={() => handleClick(1)}>{'<<'}</button>
                <button className="previous-page" onClick={() => setPage(page-1)} disabled={page<=1}>{'<'}</button>
                {
                    pList.map((_, idx) => <button className={idx+1==page ? 'selected-page' :''} key={idx} onClick={() => handleClick(idx+1)}>{idx+1}</button>)
                }
                <button className="next-page" onClick={() => setPage(page+1)} disabled={page>=5}>{'>'}</button>
                <button className="last-page" onClick={() => handleClick(5)}>{'>>'}</button>
            </div>
        </div>
    )
}
export default Pagination;