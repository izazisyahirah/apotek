import ErrorPage from "../../components/ErrorPage";

export default function Error400() {
  return (
    <ErrorPage
      code="400"
      title="Bad Request"
      message="Oops! Something went wrong with the request. Please check your input and try again."
    />
  );
}
