const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    
    const { checkIn, checkOut } = req.body.booking;

    if (new Date(checkIn) >= new Date(checkOut)) {
        req.flash("error", "Check-out date must be after check-in date!");
        return res.redirect(`/listings/${id}`);
    }

    const newBooking = new Booking({
        user: req.user._id,
        listing: id,
        checkIn: checkIn,
        checkOut: checkOut,
        status: "Confirmed"
    });

    await newBooking.save();
    
    req.flash("success", "Booking Confirmed!");
    
    res.redirect("/listings");
};

module.exports.destroyBooking = async (req, res) => {
    const { id, bookingId } = req.params;
    
    await Booking.findByIdAndDelete(bookingId);
    
    req.flash("success", "Booking Cancelled!");
    res.redirect("/bookings");
};