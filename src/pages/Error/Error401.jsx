import ErrorPage from "../../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      title="Unauthorized"
      message="Oops! You need to log in to access this page. Please check your credentials and try again."
    />
  );
}
