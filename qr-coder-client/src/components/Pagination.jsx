import React from "react";
import { Link } from "react-router-dom";
import '../styles/pagination.scss';

const Pagination = ({page=1, total=1}) => {
    if(total === 1)
        return;
    return (
        <div className="pagination">
            <div className="pages">
                {page > 2 && (
                    <div className="page disabled">. . .</div>
                )}
                {(total == page && page>2) && (
                    <Link className="page" to={`/main/${Number(page)-2}`}>{Number(page)-2}</Link>
                )}
                {Number(page) > 1 && (
                    <Link className="page" to={`/main/${Number(page)-1}`}>{Number(page)-1}</Link>
                )}
                <div className="page active">{page}</div>
                {total>=Number(page)+1 && (
                    <Link className="page" to={`/main/${Number(page)+1}`}>{Number(page)+1}</Link>
                )}
                {(page == 1 && total>2) && (
                    <Link className="page" to={`/main/${Number(page)+2}`}>{Number(page)+2}</Link>
                )}
                {total - Number(page) > 1 && (
                    <div className="page disabled">. . .</div>
                )}
            </div>
        </div>
    );
};

export default Pagination;