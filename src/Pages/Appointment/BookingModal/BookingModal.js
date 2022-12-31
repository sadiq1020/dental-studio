import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name: treatmentName, slots } = treatment;
    const date = format(selectedDate, 'PPP');

    const { user } = useContext(AuthContext)

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const number = form.number.value;

        const bookingInfo = {
            appointmentDate: date,
            treatmentName,
            patientName: name,
            slot,
            email,
            number
        }
        console.log(bookingInfo);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking confirmed');
                    refetch();
                }
                else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-5 mt-5'>
                        <input type="text" value={date} readOnly className='input w-full bordered border-primary' />
                        <select name='slot' className="select select-primary w-full">

                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name="name" defaultValue={user?.displayName} readOnly placeholder='Your Name' className='input w-full bordered border-primary' />
                        <input type="email" name="email" defaultValue={user?.email} readOnly placeholder='Email Address' className='input w-full bordered border-primary' />
                        <input type="number" name="number" placeholder='Phone Number' className='input w-full bordered border-primary' />

                        {/* Name, Email Address will be coming from logged in user info */}
                        <br />
                        <div className='flex justify-center'>
                            <input className='btn btn-primary px-14 bg-gradient-to-r from-cyan-500 to-blue-500 mt-5' type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;