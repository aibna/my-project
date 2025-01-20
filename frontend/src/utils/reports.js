import { getUser } from "./auth";
import { supabase } from "./client";

export async function saveReport(type, user_input, content) {
  console.log({ type, user_input, content });
  const { data } = await getUser();
  const user_id = data.session.user.id;
  console.log(user_id);
  const supabaseResponse = await supabase.from("reports").insert({
    user_id,
    type,
    user_input,
    content,
    user_email: data.session.user.email,
  });
  return supabaseResponse;
}

export async function getUserReports({ sort = "asc", type = null } = {}) {
  try {
    const { data } = await getUser();
    const user_id = data.session.user.id;

    let query = supabase.from("reports").select("*").eq("user_id", user_id);

    if (type) {
      query = query.eq("type", type);
    }

    // Apply sorting order based on 'created_at'
    if (sort === "asc") {
      query = query.order("created_at", { ascending: true });
    } else if (sort === "desc") {
      query = query.order("created_at", { ascending: false });
    }

    const { data: reports, error } = await query;

    if (error) throw error;

    return reports;
  } catch (error) {
    console.error("Error fetching user reports:", error);
    return [];
  }
}

export async function deleteReport(id) {
  const { data } = await getUser();
  const user_id = data.session.user.id;
  const { error } = await supabase
    .from("reports")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) {
    console.error("Error deleting report:", error);
    return false;
  }

  return true;
}

export async function getUserReportsForDoctor({
  sort = "asc",
  type = null,
  email = "",
} = {}) {
  console.log(sort, type, email);

  try {
    let query = supabase.from("reports").select("*").eq("user_email", email);

    if (type) {
      query = query.eq("type", type);
    }

    // Apply sorting order based on 'created_at'
    if (sort === "asc") {
      query = query.order("created_at", { ascending: true });
    } else if (sort === "desc") {
      query = query.order("created_at", { ascending: false });
    }

    const { data: reports, error } = await query;

    if (error) throw error;

    return reports;
  } catch (error) {
    console.error("Error fetching user reports:", error);
    return [];
  }
}
