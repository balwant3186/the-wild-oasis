import supabase from "./supabase";

export const getAllGuests = async () => {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) {
    throw new Error("Guests could not be loaded");
  }
  return data;
};

export const deleteGuest = async (id) => {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);
  if (error) {
    throw new Error("Guest could not be deleted");
  }
  return { data, error };
};

export const createEditGuest = async (guest) => {
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...guest }])
    .select();

  if (error) {
    throw new Error("Guest could not be created");
  }
  return { data, error };
};
