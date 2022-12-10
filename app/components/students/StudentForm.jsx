import {
  Form,
  Link,
  useActionData,
  // useLoaderData,
  useMatches,
  useParams,
  useTransition as useNavigation,
} from "@remix-run/react";
// import { useSubmit } from "@remix-run/react";

function StudentForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  // this hook can be used called in either route or component
  // this will return closest action (or loader) that was called for this component
  const validationErrors = useActionData();

  // const studentData = useLoaderData();
  const params = useParams();
  const matches = useMatches();
  const students = matches.find(
    (match) => match.id === "routes/__students/students"
  ).data;

  const studentData = students.find((student) => student.id === params.id); // params.id matches filename ($id.jsx)

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const defaultValue = studentData
    ? {
        title: studentData.title,
        amount: studentData.amount,
        date: studentData.date.slice(0, 10) ?? "",
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  // const submit = useSubmit()

  // function submitHandler(event) {
  //   event.preventDefault();
  //   // perform your own validation
  //   // ...
  //   submit(event.target, {
  //     // action: "/students/add",
  //     method: "post",
  //   });
  // }

  return (
    <Form
      method="post"
      className="form"
      id="expense-form"
      // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Student Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValue.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValue.date}
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving ..." : "Save Student"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default StudentForm;
