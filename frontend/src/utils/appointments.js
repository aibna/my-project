import { getUser } from "./auth";
import { supabase } from "./client";

export async function getAppointmentsForDoctor() {
  try {
    const { data } = await getUser();
    const doctor_email = data.session.user.email;

    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("doctor_email", doctor_email)
      .order("date", { ascending: true });

    if (error) throw error;

    return appointments;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return [];
  }
}

export async function createAppointmentSlot(date, time) {
  const { data } = await getUser();
  const doctor_email = data.session.user.email;
  const doctor_name = data.session.user.user_metadata.full_name;
  const { data: appointments } = await supabase.from("appointments").insert({
    doctor_email,
    doctor_name,
    date,
    time,
    patient_name: null,
    patient_email: null,
  });
  return appointments;
}

export async function getAllAvailableAppointments() {
  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .eq("is_booked", false)
    .order("date", { ascending: true });

  return appointments;
}

export async function getUserBookedAppointments() {
  const { data } = await getUser();
  const patient_email = data.session.user.email;

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_email", patient_email)
    .order("date", { ascending: true });

  if (error) throw error;

  return appointments;
}

export async function bookAppointment(appointmentId) {
  const { data } = await getUser();
  const patient_email = data.session.user.email;
  const patient_name = data.session.user.user_metadata.full_name;

  const { data: appointments } = await supabase
    .from("appointments")
    .update({ patient_email, patient_name, is_booked: true })
    .eq("id", appointmentId);

  return appointments;
}
