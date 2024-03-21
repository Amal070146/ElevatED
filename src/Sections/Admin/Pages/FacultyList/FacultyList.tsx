import styles from "./FacultyList.module.css";
import demo from "./demo.png"; // Assuming all faculty members use the same demo image

type Props = {};

// Example dataset of faculty members
const facultyMembers = [
  { id: 1, name: "Dr. Alice Brown", email: "alice.brown@example.com" },
  { id: 2, name: "Dr. Bob Smith", email: "bob.smith@example.com" },
  { id: 3, name: "Dr. Carol Jones", email: "carol.jones@example.com" },
  // Add more faculty members as needed
];

export const FacultyList = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <h1>Faculty Requests</h1>
        <p>
          View pending requests from faculty members to join your organization
        </p>
      </div>
      <div className={styles.Content}>
        {facultyMembers.map((member) => (
          <div key={member.id} className={styles.Individual}>
            <div>
              <img src={demo} alt="" />
              <h3>{member.name}</h3>
              <p>{member.email}</p>
            </div>
            <div>
              <button>Approve</button>
              <button>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
