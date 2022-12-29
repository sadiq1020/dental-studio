import React from 'react';

const AvailableAppointment = ({ option, setTreatment }) => {
    // console.log(option);
    const { name, slots } = option;
    return (
        <div className="card w-96 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-primary-content">
            <div className="card-body">
                <h2 className="card-title text-purple-100">{name}</h2>
                <h3 className='text-lg'>Select Your Slot: </h3>
                <p>{slots.length > 0 ? slots[0] : 'Not available, try another day'}</p>
                <p className='text-white font-semibold'>{slots.length} {slots.length > 1 ? 'Slots' : 'Slot'} available</p>
                <div className="card-actions justify-end">
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(option)}
                        htmlFor="booking-modal"
                        className="btn btn-primary bg-gradient-to-r from-cyan-500 to-blue-500 mt-5"
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AvailableAppointment;