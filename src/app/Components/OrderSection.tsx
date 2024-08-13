
import React from 'react';
import './OrderDetails.css';

type Props = {
    id: string;
    bookingid: string;
    cancelDate: string;
    groomedDate: string;
    Gpackage: GroomingPackage
    img:string;
    bookingadrs: Address;
    amount: Amount;
    slot: Slot
    status: string;
    bookingdate: string;
}

type GroomingPackage = {
    pid: string;
    breedname: string;
    packageName: string;
    packageDesc: string;
    services: string[];
    charge: number;
};

type Amount = {
    package: number;
    fee: number;
    tax: number;
    discount: number;
    paid: Boolean;
}

type Address = {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    phone: string;
}
type Slot = {
    time: string;
    date: Sdate
}

type Sdate = {
    dayName: string;
    dayNumber: number;
    month: string;
    year: string;
}

const OrderSection: React.FC<Props> = ({ id, bookingid, bookingdate, Gpackage, amount, bookingadrs, slot, status, cancelDate, groomedDate,img }) => {
    const { dayName, dayNumber, month, year } = slot.date;
    const scheduledDate = `${month} ${dayNumber}, ${year}`;
    const grandTotal = amount.package + amount.fee
console.log(img)
    const SetBooking = () => {
        localStorage.setItem("Singlebooking", JSON.stringify({ id, status, bookingid, bookingdate, amount, bookingadrs, Gpackage, slot, cancelDate, groomedDate }));
    }

    return (
        <div className=" afm aft agb alt bbt cem cex mb-7 border-gray-700 shadow-lg rounded-lg md:w-9/12 sm:w-full ">
            <h3 className="t">Order placed on <time dateTime="2020-12-22">Dec 22, 2020</time></h3>
            <div className="lx zg afm agb aqz byw cby cdc cft">
                <dl className="mb ut yp aap awg bvi cbx cti">
                    <div>
                        <dt className="awk ayb">Grooming On</dt>
                        <dd className="ku axx">{scheduledDate}</dd>
                    </div>
                    <div className="md byq">
                        <dt className="awk ayb">Scheduled Date</dt>
                        <dd className="ku axx"><time dateTime="2020-12-22">{bookingdate}</time></dd>
                    </div>
                    <div>
                        <dt className="awk ayb">Total amount</dt>
                        <dd className="ku awk ayb">₹{grandTotal}.00</dd>
                    </div>
                </dl>
                <div className="ab lx zk cwo" data-headlessui-state="">
                    <div className="lx zg">
                        <button
                            className="fs lx zg aqw axv bla"
                            id="headlessui-menu-button-:rk:"
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-headlessui-state=""
                        >
                            <span className="t">Options for order AT48441546</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="oi sl"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="md cti cwk das dav dbw">
                    <a href={`/my-account/schedules/${bookingid}`} onClick={SetBooking} className="lx zg zl aeb afg agc alt ark asb awg awk axz bbt bik bnc bnh bnt boj">
                        <span>View Schedule</span>
                        <span className="t">AT48441546</span>
                    </a>
                </div>
            </div>
            <h4 className="t">Items</h4>
            <ul role="list" className="acj acn">
                <li className="aqz cft">
                    <div className="lx zg ccj">
                        <div className="nv rx uw adn aea aiq bzg cad">
                            <img
                                src={img}
                                alt=""
                                className="pn tu aqk aql"
                            />
                        </div>
                        <div className="jz ut awg">
                            <div className="awk ayb byt ccr md:text-xl">
                                <h5>Bingo, {Gpackage.breedname}</h5>
                                <p className="lb bxx flex  sm:hidden">
                                    {Gpackage?.packageName}<br />
                                    {scheduledDate}, {slot.time}
                                </p>
                            </div>
                            <p className="md axx byd byq md:text-sm">
                                {Gpackage?.packageName}
                            </p><p className="md axx byd byq  md:text-sm">
                                {Gpackage?.packageDesc}
                            </p>
                            <p className="md axx byd byq  md:text-sm">
                                {scheduledDate}, {slot.time}
                            </p>
                        </div>
                    </div>
                    <div className="lk byt ccr">
                        <div className="lx zg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`size-6 ${status === "Scheduled" ? "text-yellow-500" :
                                status === "Groomed" ? "text-green-500" :
                                    status === "Cancelled" ? "text-red-500" : ""
                                }`}>
                                {status === "Cancelled" ? (
                                    <path strokeLinecap="round"  strokeLinejoin="round"  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                ) : (
                                    <path strokeLinecap="round"  strokeLinejoin="round"  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                )}
                            </svg>



                            <p className="jt awg awk axx">
                                {status !== "Cancelled"
                                    ? status === "Groomed"
                                        ? `${status} on ${groomedDate}`
                                        : `${status} on ${bookingdate}`
                                    : `${status} on ${cancelDate}`}
                            </p>
                        </div>
                        <div className="lk lx zg abq aci acn aft agb avh awg awk bxl bxx cff cic">
                            <div className="lx ut zl"><a href={`/my-account/schedules/${bookingid}`} onClick={SetBooking} className="adt ayn bli">View Schedule</a></div>
                            <div className="lx ut zl att"><a href="#" className="adt ayn bli">Schedule Again</a></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default OrderSection;
