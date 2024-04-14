import supabase from "./supabase";

export const getUsers = async () => {
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    throw new Error("Users could not be loaded");
  }

  return data;
};
