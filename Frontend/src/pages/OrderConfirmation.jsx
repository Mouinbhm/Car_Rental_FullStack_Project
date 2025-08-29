import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const car = location.state?.car;
  const totals = location.state?.totals;

  useEffect(() => {
    if (!booking) {
      navigate("/cars", { replace: true });
    }
    // clear selected car after booking
    localStorage.removeItem("selectedCar");
  }, []);

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 print:bg-white">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .paper { box-shadow: none !important; border: none !important; }
          body { background: #fff; }
        }
      `}</style>
      <div className="max-w-[900px] mx-auto">
        <div className="no-print mb-4 flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Print
          </button>
        </div>
        <div className="paper bg-white rounded-xl shadow-md border border-gray-200">
          {/* Header */}
          <div className="px-8 pt-8 pb-4 border-b border-gray-200 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                DS
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  Drive Safe Rentals
                </div>
                <div className="text-sm text-gray-500">
                  Tunisia Car Rental Agency
                </div>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="text-gray-500">Receipt</div>
              <div className="font-semibold text-gray-900">
                #{String(booking._id || "").slice(-6)}
              </div>
              <div className="text-gray-500">
                Date:{" "}
                {booking.createdAt
                  ? new Date(booking.createdAt).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Bill To & Summary */}
          <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Billed To</div>
              <div className="text-gray-900 font-medium">
                {booking.firstName} {booking.lastName}
              </div>
              <div className="text-gray-700 text-sm">{booking.email}</div>
              <div className="text-gray-700 text-sm">{booking.phone}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Rental Summary</div>
              <div className="text-sm grid grid-cols-3 gap-2">
                <div className="text-gray-500">Pickup</div>
                <div className="col-span-2 text-gray-900">
                  {booking.pickupLocation} — {booking.pickupDate}{" "}
                  {booking.pickupTime}
                </div>
                <div className="text-gray-500">Return</div>
                <div className="col-span-2 text-gray-900">
                  {booking.dropoffLocation} — {booking.returnDate}{" "}
                  {booking.returnTime}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle & Charges */}
          <div className="px-8 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="text-sm text-gray-500 mb-2">Vehicle</div>
                <div className="flex items-center gap-4">
                  {car?.image && (
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {car?.make} {car?.model}
                    </div>
                    <div className="text-sm text-gray-500">{car?.category}</div>
                    <div className="text-sm text-gray-500">
                      Daily Rate: {car?.dailyRate || car?.price} TND
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Add-ons</div>
                <ul className="text-sm text-gray-800 list-disc list-inside">
                  {booking.additionalDriver && <li>Additional Driver</li>}
                  {booking.childSeat && <li>Child Seat</li>}
                  {booking.fullTank && <li>Full Tank Service</li>}
                  {!booking.additionalDriver &&
                    !booking.childSeat &&
                    !booking.fullTank && <li>None</li>}
                </ul>
              </div>
            </div>

            {/* Charges Table */}
            {totals && (
              <div className="mt-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2">Description</th>
                      <th className="py-2 text-right">Amount (TND)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">
                        Base ({(car?.dailyRate || car?.price) ?? 0} TND/day ×
                        rental period)
                      </td>
                      <td className="py-2 text-right">{totals.base}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Add-ons</td>
                      <td className="py-2 text-right">{totals.addons}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Taxes & Fees (10%)</td>
                      <td className="py-2 text-right">{totals.taxes}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">Total</td>
                      <td className="py-2 text-right font-semibold">
                        {totals.total}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 mt-2">
            <div className="text-xs text-gray-500">
              This receipt confirms your booking with Drive Safe Rentals. Please
              bring a valid driver license and credit card at pickup.
              Cancellations may be subject to fees.
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div className="text-xs text-gray-400">
                © {new Date().getFullYear()} Drive Safe Rentals
              </div>
              <div className="text-xs text-gray-400">
                www.drivesafe.tn • +216 00 000 000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
