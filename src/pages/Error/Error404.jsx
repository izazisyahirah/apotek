import ErrorPage from "../../components/ErrorPage";

export default function Error404() {
  return (
    <ErrorPage
          code="404"
          title="Not Found"
          message="Oops! The page you're looking for doesn't exist. It might have been moved or deleted."
    />
  );
}