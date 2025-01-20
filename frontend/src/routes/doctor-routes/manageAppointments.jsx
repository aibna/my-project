import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createAppointmentSlot,
  getAppointmentsForDoctor,
} from "@/utils/appointments";
import { useEffect, useState } from "react";

const ManageAppointments = () => {
  const [refetch, setRefetch] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  async function onSubmit(e) {
    e.preventDefault();
    setIsCreatingAppointment(true);

    await createAppointmentSlot(e.target.date.value, e.target.time.value);
    setIsCreatingAppointment(false);
    setRefetch(!refetch);
  }

  useEffect(() => {
    setIsLoadingAppointments(true);
    getAppointmentsForDoctor().then((appointments) => {
      setBookedAppointments(appointments.filter((a) => a.is_booked));
      setAvailableAppointments(appointments.filter((a) => !a.is_booked));
      setIsLoadingAppointments(false);
    });
  }, [refetch]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Management</h1>
      <div className="flex gap-3 flex-col md:flex-row">
        <Card className="md:max-w-xs py-5 h-fit">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">
              Create Appointment Slot
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" name="date" required />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input type="time" id="time" name="time" required />
              </div>
              <Button
                type="submit"
                disabled={isCreatingAppointment}
                className="w-full"
              >
                {isCreatingAppointment
                  ? "Creating..."
                  : "Create Appointment Slot"}
              </Button>
            </form>
          </CardContent>
        </Card>
        {/* AVAILABLE SLOTS */}
        <div className="flex-1 md:border-l-2 pl-3">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Available Slots</h2>
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
                {availableAppointments.length === 0 ? (
                  <>
                    <Card className="mb-3">
                      <CardContent className="px-4 min-h-[400px] flex items-center justify-center flex-col text-center text-red-500 font-bold">
                        <h1>You Have No Appointment Slots Created Yet</h1>
                        <h2>Create One To Get Started</h2>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    {availableAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <p className="font-semibold">
                            {new Date(appointment.date).toLocaleDateString()} at{" "}
                            {appointment.time}
                          </p>
                          <p className="font-semibold text-xs">
                            Doctor: {appointment.doctor_name}{" "}
                            <span className="text-[9px] font-bold text-green-500">
                              (You)
                            </span>
                          </p>
                          <p className="font-semibold text-xs text-muted-foreground">
                            {appointment.patientName
                              ? `Booked by: ${appointment.patientName}`
                              : "Available"}
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
        {/* BOOKED SLOTS */}
        <div className="flex-1 md:border-l-2 pl-3">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Booked Slots</h2>
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
                {bookedAppointments.length === 0 ? (
                  <>
                    <Card className="mb-3">
                      <CardContent className="px-4 min-h-[400px] flex items-center justify-center flex-col text-center text-red-500 font-bold">
                        <h1>No Appointments Are Booked Yet</h1>
                        <h2>Check Back Later</h2>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    {bookedAppointments.map((appointment) => (
                      <Card key={appointment.id} className="border-green-500">
                        <CardContent className="p-4">
                          <p className="font-semibold">
                            {new Date(appointment.date).toLocaleDateString()} at{" "}
                            {appointment.time}
                          </p>
                          <p className="font-semibold text-xs">
                            Doctor: {appointment.doctor_name}{" "}
                            <span className="text-[9px] font-bold text-green-500">
                              (You)
                            </span>
                          </p>
                          <p className="font-semibold text-xs text-muted-foreground">
                            {appointment.is_booked
                              ? `Booked by: ${appointment.patient_name} ${appointment.patient_email}`
                              : "Available"}
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
      </div>
    </div>
  );
};

export default ManageAppointments;
