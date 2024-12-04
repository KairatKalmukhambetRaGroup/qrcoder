import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllQrs } from "../../actions/admin";
import QRItem from "../QR/QRItem";
import Pagination from "../Pagination";

const AdminDashboard = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {qrs, total, count} = useSelector((state)=>state.admin);
    const {page} = useParams();

    useEffect(()=>{
        dispatch(getAllQrs(page));
    }, [page])


    return (
        <div>
            <div className="container">
                <div className="heading">
                    ADMIN
                </div>
                <div className="qrs">
                    {qrs && qrs.map((qr, key)=> (
                        <QRItem qrValue={`${process.env.REACT_APP_URL}qr/${qr.link}`} qr={qr} key={key} />
                    ))}
                </div>
                <Pagination page={page} total={total} route="admin/dashboard" />
            </div>
        </div>
    );
};

export default AdminDashboard;