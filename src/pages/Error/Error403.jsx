import ErrorPage from "../../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      title="Forbidden"
      message="Oops! You don't have permission to access this page. Contact the administrator if you think this is an error."
    />
  );
}
