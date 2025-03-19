import { Suspense, lazy } from "react";
import { CircularProgress } from "../../components";

const LazyHome = lazy(() => import("./Home"));

export const Home = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyHome {...props} />
  </Suspense>
);
