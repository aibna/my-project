import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  bookAppointment,
  getAllAvailableAppointments,
  getUserBookedAppointments,
} from "@/utils/appointments";
import { useEffect, useState } from "react";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [userBookedAppointments, setUserBookedAppointments] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);

  useEffect(() => {
    setIsLoadingAppointments(true);
    Promise.all([
      getAllAvailableAppointments(),
      getUserBookedAppointments(),
    ]).then(([availableAppointments, bookedAppointments]) => {
      setAppointments(availableAppointments);
      setUserBookedAppointments(bookedAppointments);
      setIsLoadingAppointments(false);
    });
  }, [refetch]);

  const handleBookAppointment = async (appointmentId) => {
    setIsBookingAppointment(true);
    bookAppointment(appointmentId).then(() => {
      setRefetch(!refetch);
      setIsBookingAppointment(false);
    });
  };
  return (
    <>
      <div className="container mx-auto p-4 grid md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Available Appointments</h1>
          {isLoadingAppointments ? (
            <>
              <Card className="mb-3 animate-pulse">
                <CardContent className="p-4">
                  <p className="h-6 bg-gray-200 w-1/2 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/4 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/6 mb-2"></p>
                </CardContent>
              </Card>
              <Card className="mb-3 animate-pulse">
                <CardContent className="p-4">
                  <p className="h-6 bg-gray-200 w-1/2 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/4 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/6 mb-2"></p>
                </CardContent>
              </Card>
              <Card className="mb-3 animate-pulse">
                <CardContent className="p-4">
                  <p className="h-6 bg-gray-200 w-1/2 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/4 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/6 mb-2"></p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {appointments.length === 0 ? (
                <>
                  <Card className="mb-3">
                    <CardContent className="px-4 min-h-[400px] flex items-center justify-center flex-col text-center text-red-500 font-bold">
                      <h1>No Available Appointments</h1>
                      <h2>Check Back Later</h2>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="mb-3">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">
                            {new Date(appointment.date).toLocaleDateString()} at{" "}
                            {appointment.time}
                          </p>
                          <p className="font-semibold text-xs">
                            Doctor: {appointment.doctor_name}{" "}
                          </p>
                          <p className="font-semibold text-xs text-green-500">
                            Available
                          </p>
                        </div>
                        <div>
                          <Button
                            onClick={() =>
                              handleBookAppointment(appointment.id)
                            }
                            key={`${appointment.id}-book-button`}
                            disabled={isBookingAppointment}
                          >
                            {isBookingAppointment ? "Booking..." : "Book"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Your Booked Appointments</h1>
          {isLoadingAppointments ? (
            <>
              <Card className="mb-3 animate-pulse">
                <CardContent className="p-4">
                  <p className="h-6 bg-gray-200 w-1/2 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/4 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/6 mb-2"></p>
                </CardContent>
              </Card>
              <Card className="mb-3 animate-pulse">
                <CardContent className="p-4">
                  <p className="h-6 bg-gray-200 w-1/2 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/4 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/6 mb-2"></p>
                </CardContent>
              </Card>
              <Card className="mb-3 animate-pulse">
                <CardContent className="p-4">
                  <p className="h-6 bg-gray-200 w-1/2 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/4 mb-2"></p>
                  <p className="h-6 bg-gray-200 w-1/6 mb-2"></p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              {userBookedAppointments.length === 0 ? (
                <>
                  <Card className="mb-3">
                    <CardContent className="px-4 min-h-[400px] flex items-center justify-center flex-col text-center text-green-500 font-bold">
                      <h1>You have not booked any appointments yet!</h1>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  {userBookedAppointments.map((appointment) => (
                    <Card key={appointment.id} className="mb-3">
                      <CardContent className="p-4">
                        <p className="font-semibold">
                          {new Date(appointment.date).toLocaleDateString()} at{" "}
                          {appointment.time}
                        </p>
                        <p className="font-semibold text-xs">
                          Doctor: {appointment.doctor_name}{" "}
                        </p>
                        <p className="font-semibold text-xs text-green-500">
                          Booked by: {appointment.patient_name}{" "}
                          <span className="text-[9px] font-bold">(YOU)</span>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Appointment;
