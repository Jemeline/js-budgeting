import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Calendar } from 'react-modern-calendar-datepicker';
import moment from "moment";
import { Modal } from 'react-bootstrap';


const destructureDate = (date) => {
    const momentDate = moment(date);
    if (momentDate.isValid()) {
        return {
            year: parseInt(momentDate.format("YYYY")),
            month: parseInt(momentDate.format("M")),
            day: parseInt(momentDate.format("DD")),
        }
    } else {
        return {
            year: parseInt(moment().format("YYYY")),
            month: parseInt(moment().format("M")),
            day: parseInt(moment().format("DD")),
        }
    }
};

const structureDate = (date) => {
    const momentDate = moment([date.year, date.month-1, date.day]);
    if (momentDate.isValid()) return momentDate
    else return moment();
};

const dates = {
    today: destructureDate(moment()),
    yesterday: destructureDate(moment().subtract(1, "days").startOf("day")),
    thisWeek: destructureDate(moment().startOf("week")),
    thisMonth: destructureDate(moment().startOf("month")),
    thisYear: destructureDate(moment().startOf("year")),
}


function DateSelector({startDate, endDate, show, setShow, ...props}) {
    const [selectedDay, setSelectedDay] = useState({from: destructureDate(startDate), to: destructureDate(endDate)});
    const [footer, setFooter] = useState(false);
    
    const setDateRange = (range) => {
        setFooter(false);
        setSelectedDay(range);
        if (!range.to || !range.from) return setFooter(true);
        props.setStartDate && props.setStartDate(structureDate(range.from).startOf("day"));
        props.setEndDate && props.setEndDate(structureDate(range.to).startOf("day"));
    };

    return (
        <Modal
            show={show}
            size="sm"
            onHide={() => setShow(false)}
        >
            <Modal.Body>
                <Calendar
                    value={selectedDay}
                    onChange={setDateRange}
                    calendarClassName={"custom-calendar"}
                    calendarTodayClassName={"custom-today"}
                    maximumDate={dates.today}
                    renderFooter={() => <div class="py-2 accentw-100" style={{height: "30px",display: "flex", justifyContent: "center", color: "#39ace7"}}>{(footer) ? "Invalid Date Range Selected" : ""}</div>}
                />
            </Modal.Body>
        </Modal>  
    )
};

export default DateSelector;