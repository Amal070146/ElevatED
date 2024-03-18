import styles from "./CollegeList.module.css";

type Props = {};

export const CollegeList = (_props: Props) => {
  const data = [
    {
      name: "Harvard University",
      student: "Sophia Martinez	",
      status: "Accepted",
      actions: "taken",
    },
    {
      name: "Yale University	",
      student: "William Brown	",
      status: "Rejected",
      actions: "taken",
    },
    {
      name: "Stanford University	",
      student: "Emma White	",
      status: "Pending",
      actions: "taken",
    },
    {
      name: "Massachusetts Institute of Technology	",
      student: "Samuel Lee	",
      status: "Accepted",
      actions: "taken",
    },
    {
      name: "University of California, Berkeley	",
      student: "Olivia Johnson	",
      status: "",
      actions: "nottaken",
    },
  ];
  return (
    <div className={styles.Wrapper}>
      <h1>College Name Requests</h1>
      <table>
        <thead>
          <tr>
            <th>College Name</th>
            <th>Student</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.student}</td>
              <td>{item.status}</td>
              <td>
                {item.actions === "taken" ? (
                  <button>Reject</button>
                ) : (
                  <div>
                    <button>Accept</button>
                    <button>Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>College Name</h1>
      <table>
        <thead>
          <tr>
            <th>College Name</th>
            <th>Student</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.student}</td>
              <td>
                {item.actions === "taken" ? (
                  <button>Reject</button>
                ) : (
                  <div>
                    <button>Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
