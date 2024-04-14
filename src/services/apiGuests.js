import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export const getAllGuests = async ({ page, sortBy }) => {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  }

  const { data, count, error } = await query;
  if (error) {
    throw new Error("Guests could not be loaded");
  }
  return { data, count, error };
};

export const deleteGuest = async (id) => {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);
  if (error) {
    throw new Error("Guest could not be deleted");
  }
  return { data, error };
};

export const createEditGuest = async (guest, id) => {
  let query = supabase.from("guests");

  if (id) {
    query = query.update({ ...guest }).eq("id", id);
  } else {
    query = query.insert([{ ...guest }]);
  }

  const { data, error } = await query.select();

  if (error) {
    throw new Error("Guest could not be created");
  }
  return { data, error };
};
