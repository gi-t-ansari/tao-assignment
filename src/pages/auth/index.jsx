import { Suspense, lazy } from "react";
import { CircularProgress } from "../../components";

const LazyLogin = lazy(() => import("./Login"));

export const Login = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyLogin {...props} />
  </Suspense>
);
