import StudentsListItem from "./StudentListItem";

export default function StudentsList({ students }) {
  return (
    <ol id="expenses-list">
      {students.map((student) => (
        <li key={student.id}>
          <StudentsListItem
            id={student.id}
            title={student.title}
            amount={student.amount}
          />
        </li>
      ))}
    </ol>
  );
}
