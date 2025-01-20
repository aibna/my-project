import { supabase } from "./client";

export async function signUp({ email, password, fullName }) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "patient",
        },
      },
    });

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

export async function login({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getUser() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

export async function getUserRole() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { data };
  } catch (error) {
    return { error: error.message };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { message: "Signed out successfully" };
  } catch (error) {
    return { error: error.message };
  }
}
