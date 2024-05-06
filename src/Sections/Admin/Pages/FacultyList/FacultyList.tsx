import { useEffect, useState } from "react";
import styles from "./FacultyList.module.css";
import demo from "./demo.png"; // Assuming all faculty members use the same demo image
import { supabase } from "../../../../utils/supabase";
import toast from "react-hot-toast";

export const FacultyList = () => {
  const [data, setData] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    let { data: users, error } = await supabase
      .from("extended_user_view")
      .select(
        "*, users(first_name, last_name, email), user_role_link(status)"
      )
      .eq("role_id", "71650c91-b579-4d1d-a90e-40d12a1c8ab3");
    if (error) {
      toast.error(error.message);
    } else if (users) {
      setData(users);
      return users;
    }
  };

  const handleApproveDecline = async (status: boolean, id: string) => {
    const { data, error } = await supabase
      .from("user_role_link")
      .update({ status: status })
      .eq("user_id", id)
      .select();
    if (error) {
      toast.error(error.message);
    } else if (data) {
      setRefresh(!refresh);
      toast.success("Request updated successfully");
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("user_role_link")
      .delete()
      .eq("user_id", id);
    if (error) {
      toast.error(error.message);
    } else {
      setRefresh(!refresh);
      toast.success("Request deleted successfully");
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <h2 style={{  marginTop: "5", color: "#0a8677" }} >FACULTY REQUESTS</h2>
        <p>
          View pending requests from faculty members to join your organization
        </p>
      </div>
      <div className={styles.Content}>
        {data &&
          data
            .filter((member) => member.user_role_link.status === false)
            .map((member) => (
              <div key={member.id} className={styles.Individual}>
                <div>
                  <img src={demo} alt="" />
                  <h3>
                    {member?.users?.first_name} {member?.users?.last_name}
                  </h3>
                  <p>{member.email}</p>
                </div>
                <div>
                  <button onClick={() => handleApproveDecline(true, member.id)}>
                    Approve
                  </button>
                  <button onClick={() => handleDelete(member.id)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
      </div>
      <div className={styles.Header}>
        <h2>Approved Faculty</h2>
        <p>Approved Faculty</p>
      </div>
      <div className={styles.Content}>
        {data
          .filter((member) => member.user_role_link.status === true)
          .map((member) => (
            <div key={member.id} className={styles.Individual}>
              <div>
                <img src={demo} alt="" />
                <h3>
                  {member?.users?.first_name} {member?.users?.last_name}
                </h3>
                <p>{member.email}</p>
              </div>
              <div>
                <button onClick={() => handleApproveDecline(false, member.id)}>
                  Mark as pending
                </button>
                <button onClick={() => handleDelete(member.id)}>Remove</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
