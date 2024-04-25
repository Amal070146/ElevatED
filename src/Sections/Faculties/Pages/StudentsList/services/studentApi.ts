import { supabase } from "../../../../../utils/supabase";

export const getStudentData = async (
  rowsPerPage: number,
  currentPage: number,
  searchTerm: string,
  sortColumn: string
) => {
  console.log(rowsPerPage, currentPage, searchTerm, sortColumn);
  let { data: users, error } = await supabase
  .from('users')
  .select("*")
  if (error) {
    console.log(error);
  } else if (users) {
    const updated = users.filter((user) => (
      user.working_institute_id === null
    ))
    return updated
  }  
};
