import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      404 not found
      <Link to="/">Go back to Home</Link>
    </div>
  );
}
