import supabase from "./supabase";

export const getAllGuests = async () => {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) {
    throw new Error("Guests could not be loaded");
  }
  return data;
};
