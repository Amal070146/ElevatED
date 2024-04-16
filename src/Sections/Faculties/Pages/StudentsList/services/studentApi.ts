import { supabase } from "../../../../../utils/supabase";

export const getStudentData = async (
  rowsPerPage: number,
  currentPage: number,
  searchTerm: string,
  sortColumn: string
) => {
  console.log(rowsPerPage, currentPage, searchTerm, sortColumn);
  let { data: stores, error } = await supabase.from("stores").select("*");
  if(error) {
    throw error.message;
  } else if(stores) {
    return stores;
  }
};
